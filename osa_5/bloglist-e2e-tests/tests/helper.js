const attemptLogin = async (page, username, password) => {
  await page.getByTestId("UsernameInput").fill(username)
  await page.getByTestId("PasswordInput").fill(password)
  await page.getByRole("button", { name: "Login" }).click()
}

export { attemptLogin }