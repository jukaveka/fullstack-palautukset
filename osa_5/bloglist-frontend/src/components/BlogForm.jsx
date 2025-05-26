import { useState } from "react"
import Input from "./Input"
import Button from "./Button"
import BlogService from "../services/blogs"
import PropTypes from "prop-types"

const BlogForm = ({ blogs, setBlogs, setSuccessMessage, setErrorMessage }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const buttonStyle = {
    color: "white",
    backgroundColor: "#8FA998",
    margin: "5px"
  }

  const hrStyle = {
    border: "2px solid #CFD2CD"
  }

  const handleNewBlog = async event => {
    event.preventDefault()

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

      setSuccessMessage(`${addedBlog.title} added to list`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(`Adding blog failed - ${exception.message}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <hr style={hrStyle} />
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
        <br/><br/>
        <Button
          text="Add blog"
          onClick={handleNewBlog}
          style={buttonStyle}
        />
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired
}

export default BlogForm