import { useState } from "react"
import Input from "./Input"
import Button from "./Button"
import BlogService from "../services/blogs"

const BlogForm = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleNewBlog = async event => {
    event.preventDefault()

    console.log("Button clicked to add new blog")
    console.log("User has inputted following for new blog")
    console.log("Title", title)
    console.log("Author", author)
    console.log("URL", url)

    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    try {
      const addedBlog = await BlogService.create(newBlog)

      const newBlogs = blogs.concat(addedBlog)
      setBlogs(newBlogs)

      setTitle("")
      setAuthor("")
      setUrl("")
    } catch (exception) {
      console.log("Error with adding blog")
      console.log("Exception", exception.message)
    }
  }

  return (
    <div>
      <hr />
      <h2> Add new blog </h2>
      <form>
        <Input
          label="Title"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <Input
          label="Author"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <Input
          label="URL"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <Button
          text="Add blog"
          onClick={handleNewBlog}
        />
      </form>
    </div>
  )
}

export default BlogForm