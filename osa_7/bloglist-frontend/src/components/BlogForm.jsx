import { useState, forwardRef, useImperativeHandle } from "react"
import Input from "./Input"
import Button from "./Button"
import PropTypes from "prop-types"

const BlogForm = forwardRef((props, ref) => {
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

  const emptyBlogForm = () => {
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  useImperativeHandle(ref, () => {
    return {
      emptyBlogForm
    }
  })

  const handleNewBlog = async event => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    await props.createNewBlog(newBlog)
  }

  return (
    <div>
      <hr style={hrStyle} />
      <h2> Add new blog </h2>
      <form data-testid="blogform">
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
        <br /><br />
        <Button
          text="Add blog"
          onClick={handleNewBlog}
          style={buttonStyle}
        />
      </form>
    </div>
  )
})

BlogForm.propTypes = {
  createNewBlog: PropTypes.func.isRequired
}

BlogForm.displayName = "BlogForm"

export default BlogForm
