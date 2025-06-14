import { screen, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"

test("<BlogForm /> event handler is called correctly", async () => {
  const user = userEvent.setup()
  const createNewBlog = vi.fn()

  const container = render(<BlogForm createNewBlog={createNewBlog} />).container

  const titleInput = container.querySelector("#Title")
  const authorInput = container.querySelector("#Author")
  const urlInput = container.querySelector("#URL")
  const submitButton = screen.getByText("Add blog")

  await user.type(titleInput, "Software engineering job openings hit five-year low?")
  await user.type(authorInput, "Gergely Orosz")
  await user.type(urlInput, "https://blog.pragmaticengineer.com/software-engineer-jobs-five-year-low/")
  await user.click(submitButton)

  expect(createNewBlog.mock.calls).toHaveLength(1)
  expect(createNewBlog.mock.calls[0][0].title).toBe("Software engineering job openings hit five-year low?")
  expect(createNewBlog.mock.calls[0][0].author).toBe("Gergely Orosz")
  expect(createNewBlog.mock.calls[0][0].url).toBe("https://blog.pragmaticengineer.com/software-engineer-jobs-five-year-low/")
})