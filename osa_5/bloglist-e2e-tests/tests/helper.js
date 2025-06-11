const attemptLogin = async (page, username, password) => {
  await page.getByTestId("UsernameInput").fill(username)
  await page.getByTestId("PasswordInput").fill(password)
  await page.getByRole("button", { name: "Login" }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByTestId("TitleInput").fill(title)
  await page.getByTestId("AuthorInput").fill(author)
  await page.getByTestId("URLInput").fill(url)
  await page.getByRole("button", { name: "Add blog" }).click()

  await page.getByText(`${title} ${author}`).waitFor()
}

export { attemptLogin, createBlog }