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
      await page.getByRole("button", { name: "Add new blog" }).click()

      await createBlog(page, "Stack overflow is almost dead", "Gergely Orosz", "https://blog.pragmaticengineer.com/stack-overflow-is-almost-dead/")

      await expect(page.getByText("Stack overflow is almost dead by Gergely Orosz")).toBeVisible()
    })

    describe("with blog added", () => {
      const title = "Software engineering job openings hit five-year low?"
      const author = "Gergely Orosz"
      const url = "https://blog.pragmaticengineer.com/software-engineer-jobs-five-year-low/"

      beforeEach(async ({ page }) => {
        await page.getByRole("button", { name: "Add new blog" }).click()

        await createBlog(page, title, author, url)
      })

      test("blog has 0 likes initially", async ({ page }) => {
        await page.getByRole("button", { name: "View" }).click()
        await expect(page.getByText("likes 0")).toBeVisible()
      })

      test("blog has 1 like after liking it once", async ({ page }) => {
        await likeBlog(page, title, author)
        await page.getByText(`${title} by ${author}`).getByRole("button", { name: "View" }).click()
        await expect(page.getByText("likes 1")).toBeVisible()
      })

      test("blog likes increment by 1 for each click", async ({ page }) => {
        await likeBlog(page, title, author)
        await likeBlog(page, title, author)
        await likeBlog(page, title, author)

        await page.getByText(`${title} by ${author}`).getByRole("button", { name: "View" }).click()
        await expect(page.getByText("likes 3")).toBeVisible()
      })

      test("blog removal button is visible if user added the blog", async ({ page }) => {
        await page.getByText(`${title} by ${author}`).getByRole("button", { name: "View" }).click()
        expect(page.getByRole("button", { name: "Remove" })).toBeVisible()
      })

      test("blog removal button is invisible if user didn't add the blog", async ({ page }) => {
        await page.getByRole("button", { name: "Logout" }).click()
        await attemptLogin(page, "pilvi", "salasana")
        await page.getByText(`${title} by ${author}`).getByRole("button", { name: "View" }).click()

        expect(page.getByRole("button", { name: "Hide" })).toBeVisible()
        expect(page.getByRole("button", { name: "Remove" })).not.toBeVisible()
      })

      test("blog can be removed by user who added the blog", async ({ page }) => {
        await expect(page.getByText(`${title} by ${author}`)).toBeVisible()

        await page.getByText(`${title} by ${author}`).getByRole("button", { name: "View" }).click()
        page.on("dialog", dialog => dialog.accept())
        await page.getByRole("button", { name: "Remove" }).click()

        await expect(page.getByText(`${title} by ${author}`)).not.toBeVisible()
      })
    })
  })
})