const attemptLogin = async (page, username, password) => {
  await page.getByTestId("UsernameInput").fill(username)
  await page.getByTestId("PasswordInput").fill(password)
  await page.getByRole("button", { name: "Login" }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "Add new blog" }).click()

  await page.getByTestId("TitleInput").fill(title)
  await page.getByTestId("AuthorInput").fill(author)
  await page.getByTestId("URLInput").fill(url)
  await page.getByRole("button", { name: "Add blog" }).click()

  await page.getByText(`${title} by ${author}`).waitFor()
}

const likeBlog = async (page, title, author) => {
  const blog = page.getByText(`${title} by ${author}`)
  const likeElement = await blog.getByTestId("blogLikes").textContent()
  const expectedLikes = getExpectedLikes(likeElement)

  await blog.getByRole("button", { name: "View" }).click()
  await blog.getByRole("button", { name: "Like" }).click()
  await blog.getByText(expectedLikes).waitFor()
  await blog.getByRole("button", { name: "Hide" }).click()
}

const getExpectedLikes = (element) => {
  const likesString = element.substring(0, element.length - 5).replace("likes ", "")
  const likesInteger = parseInt(likesString)

  return `likes ${likesInteger + 1}`
}

export {
  attemptLogin,
  createBlog,
  likeBlog
}