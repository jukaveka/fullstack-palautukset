import { screen, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe("<Blog />", () => {
  let container
  const updateBlogLikes = vi.fn()
  const removeBlog = vi.fn()

  beforeEach(() => {
    const blog = {
      title: "Stack overflow is almost dead",
      author: "Gergely Orosz",
      url: "https://blog.pragmaticengineer.com/stack-overflow-is-almost-dead/",
      likes: 0,
      user: {
        id: 1,
        username: "timo",
        name: "Timo Takkunen"
      }
    }
    const user = {
      id: 1,
      username: "timo",
      name: "Timo Takkunen"
    }

    container = render(<Blog blog={blog} user={user} updateBlogLikes={updateBlogLikes} removeBlog={removeBlog} />).container
  })

  test("displays only title and author at first", () => {
    const title = screen.findByText("Stack overflow is almost dead")
    const author = screen.findByText("Gergely Orosz")

    expect(title).toBeDefined()
    expect(author).toBeDefined()
  })

  test("hides url, likes and user at first", () => {
    const togglableBlogContent = container.querySelector(".togglableContent")

    expect(togglableBlogContent).toHaveStyle("display: none")
  })

  test("displays url, likes and user after clicking View -button", async () => {
    const user = userEvent.setup()

    const viewButton = await screen.findByText("View")
    await user.click(viewButton)

    const togglableBlogContent = container.querySelector(".togglableContent")
    expect(togglableBlogContent).not.toHaveStyle("display: none")
  })

  test("like button event handler registers clicks correctly", async () => {
    const user = userEvent.setup()

    const viewButton = await screen.findByText("View")
    await user.click(viewButton)

    const likeButton = screen.getByText("Like")
    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateBlogLikes.mock.calls).toHaveLength(2)
  })
})