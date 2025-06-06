const { test, expect, beforeEach, describe } = require("@playwright/test")
const { attemptLogin } = require("./helper")

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
})