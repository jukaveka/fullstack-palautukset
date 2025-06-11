const { test, expect, beforeEach, describe } = require("@playwright/test")
const { attemptLogin, createBlog } = require("./helper")

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

      await expect(page.getByText("Stack overflow is almost dead Gergely Orosz")).toBeVisible()
    })

    describe("with blog added", () => {
      beforeEach(async ({ page }) => {
        await page.getByRole("button", { name: "Add new blog" }).click()

        await createBlog(page, "Survey: What's in your tech stack?", "Gergely Orosz", "https://blog.pragmaticengineer.com/survey-whats-in-your-tech-stack/")

        await page.getByRole("button", { name: "View" }).click()
      })

      test("blog has 0 likes initially", async ({ page }) => {
        await expect(page.getByText("likes 0")).toBeVisible()
      })

      test("blog has 1 like after liking it once", async ({ page }) => {
        await page.getByRole("button", { name: "Like" }).click()

        await expect(page.getByText("likes 1")).toBeVisible()
      })

      test("blog likes increment by 1 for each click", async ({ page }) => {
        const likeButton = page.getByRole("button", { name: "Like" })

        await likeButton.click()
        await expect(page.getByText("likes 1")).toBeVisible()

        await likeButton.click()
        await expect(page.getByText("likes 2")).toBeVisible()

        await likeButton.click()
        await expect(page.getByText("likes 3")).toBeVisible()
      })
    })
  })
})