const { test, expect, beforeEach, describe } = require("@playwright/test")
const { attemptLogin, createBlog, likeBlog } = require("./helper")

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset")
    await request.post("/api/users", {
      data: {
        username: "jarkko",
        name: "Jarkko Mikkonen",
        password: "salasana"
      }
    })
    await request.post("/api/users", {
      data: {
        username: "pilvi",
        name: "Pilvi Mäkinen",
        password: "salasana"
      }
    })

    await page.goto("/")
  })

  test("login form is visible", async ({ page }) => {
    const header = page.getByRole("heading", { name: "Login" })
    await expect(header).toBeVisible()

    const form = page.getByTestId("loginform")
    await expect(form).toBeVisible()
  })

  test("login succeeds with valid credentials", async ({ page }) => {
    await attemptLogin(page, "jarkko", "salasana")

    await expect(page.getByText("Logged in as Jarkko")).toBeVisible()
  })

  test("login fails with nonexistent name", async ({ page }) => {
    await attemptLogin(page, "pirkko", "salasana")

    await expect(page.getByText("wrong username or password")).toBeVisible()
  })

  test("login fails with incorrect password", async ({ page }) => {
    await attemptLogin(page, "jarkko", "sanasala")

    await expect(page.getByText("wrong username or password")).toBeVisible()
  })

  describe("as logged in user", () => {
    beforeEach(async ({ page }) => {
      attemptLogin(page, "jarkko", "salasana")
    })

    test("blog form can be opened", async ({ page }) => {
      await page.getByRole("button", { name: "Add new blog" }).click()

      await expect(page.getByRole("heading", { name: "Add new blog" })).toBeVisible()
      await expect(page.getByTestId("blogform")).toBeVisible()
    })

    test("valid blog can be added", async ({ page }) => {
      await createBlog(page, "Stack overflow is almost dead", "Gergely Orosz", "https://blog.pragmaticengineer.com/stack-overflow-is-almost-dead/")

      await expect(page.getByText("Stack overflow is almost dead by Gergely Orosz")).toBeVisible()
    })

    describe("with blogs added", () => {
      const blog = {
        title: "Software engineering job openings hit five-year low?",
        author: "Gergely Orosz",
        url: "https://blog.pragmaticengineer.com/software-engineer-jobs-five-year-low/"
      }

      beforeEach(async ({ page }) => {
        await createBlog(page, blog.title, blog.author, blog.url)
      })

      test("blog has 0 likes initially", async ({ page }) => {
        const blogElement = page.getByText(`${blog.title} by ${blog.author}`)
        await blogElement.getByRole("button", { name: "View" }).click()
        await expect(blogElement.getByText("likes 0")).toBeVisible()
      })

      test("blog has 1 like after liking it once", async ({ page }) => {
        await likeBlog(page, blog.title, blog.author)
        await page.getByText(`${blog.title} by ${blog.author}`).getByRole("button", { name: "View" }).click()
        await expect(page.getByText("likes 1")).toBeVisible()
      })

      test("blog likes increment by 1 for each click", async ({ page }) => {
        await likeBlog(page, blog.title, blog.author)
        await likeBlog(page, blog.title, blog.author)
        await likeBlog(page, blog.title, blog.author)

        await page.getByText(`${blog.title} by ${blog.author}`).getByRole("button", { name: "View" }).click()
        await expect(page.getByText("likes 3")).toBeVisible()
      })

      test("blog removal button is visible if user added the blog", async ({ page }) => {
        await page.getByText(`${blog.title} by ${blog.author}`).getByRole("button", { name: "View" }).click()
        await expect(page.getByRole("button", { name: "Remove" })).toBeVisible()
      })

      test("blog removal button is invisible if user didn't add the blog", async ({ page }) => {
        await page.getByRole("button", { name: "Logout" }).click()
        await attemptLogin(page, "pilvi", "salasana")
        await page.getByText(`${blog.title} by ${blog.author}`).getByRole("button", { name: "View" }).click()

        await expect(page.getByRole("button", { name: "Hide" })).toBeVisible()
        await expect(page.getByRole("button", { name: "Remove" })).not.toBeVisible()
      })

      test("blog can be removed by user who added the blog", async ({ page }) => {
        await expect(page.getByText(`${blog.title} by ${blog.author}`)).toBeVisible()

        await page.getByText(`${blog.title} by ${blog.author}`).getByRole("button", { name: "View" }).click()
        page.on("dialog", dialog => dialog.accept())
        await page.getByRole("button", { name: "Remove" }).click()

        await expect(page.getByText(`${blog.title} by ${blog.author}`)).not.toBeVisible()
      })
    })

    describe("with multiple blogs added", async () => {
      const firstBlog = {
        title: "Survey: What's in your tech stack?",
        author: "Gergely Orosz",
        url: "https://blog.pragmaticengineer.com/survey-whats-in-your-tech-stack/",
      }

      const secondBlog = {
        title: "Stack overflow is almost dead",
        author: "Gergely Orosz",
        url: "https://blog.pragmaticengineer.com/stack-overflow-is-almost-dead/",
      }

      const thirdBlog = {
        title: "Builder.ai did not “fake AI with 700 engineers”",
        author: "Gergely Orosz",
        url: "https://blog.pragmaticengineer.com/builder-ai-did-not-fake-ai/",
      }

      beforeEach(async ({ page }) => {
        await createBlog(page, firstBlog.title, firstBlog.author, firstBlog.url)
        await createBlog(page, secondBlog.title, secondBlog.author, secondBlog.url)
        await createBlog(page, thirdBlog.title, thirdBlog.author, thirdBlog.url)
      })

      test("blogs are displayed by their likes, in descending order", async ({ page }) => {
        await likeBlog(page, secondBlog.title, secondBlog.author)
        await likeBlog(page, secondBlog.title, secondBlog.author)
        await likeBlog(page, secondBlog.title, secondBlog.author)
        await likeBlog(page, secondBlog.title, secondBlog.author)
        await likeBlog(page, secondBlog.title, secondBlog.author)

        await likeBlog(page, thirdBlog.title, thirdBlog.author)
        await likeBlog(page, thirdBlog.title, thirdBlog.author)
        await likeBlog(page, thirdBlog.title, thirdBlog.author)

        await page.getByRole("button", { name: "View" }).first().click()
        await expect(page.getByText(secondBlog.url)).toBeVisible()
        await expect(page.getByText(firstBlog.url)).not.toBeVisible()
        await expect(page.getByText(thirdBlog.url)).not.toBeVisible()
        await page.getByRole("button", { name: "Hide" }).click()

        await page.getByRole("button", { name: "View" }).last().click()
        await expect(page.getByText(firstBlog.url)).toBeVisible()
        await expect(page.getByText(secondBlog.url)).not.toBeVisible()
        await expect(page.getByText(thirdBlog.url)).not.toBeVisible()
      })
    })
  })
})