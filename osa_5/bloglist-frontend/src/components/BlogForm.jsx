import { useState } from "react"
import Input from "./Input"
import Button from "./Button"
import PropTypes from "prop-types"

const BlogForm = ({ createNewBlog }) => {
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

    await createNewBlog(newBlog)
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
  createNewBlog: PropTypes.func.isRequired
}

export default BlogForm