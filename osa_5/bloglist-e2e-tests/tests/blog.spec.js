const { test, expect, beforeEach, describe } = require("@playwright/test")

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset")
    await request.post("/api/users", {
      username: "jarkko",
      name: "Jarkko Mikkonen",
      password: "salasana"
    })

    await page.goto("/")
  })

  test("login form is visible", async ({ page }) => {
    const header = page.getByRole("heading", { name: "Login" })
    await expect(header).toBeVisible()

    const form = page.getByTestId("loginform")
    await expect(form).toBeVisible()
  })
})