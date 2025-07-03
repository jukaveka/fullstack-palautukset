import { useState } from "react"
import Input from "./Input"
import Button from "./Button"
import PropTypes from "prop-types"
import { useMutation } from "@tanstack/react-query"
import BlogService from "../services/blogs"
import { useBlogsDispatch } from "../context/BlogContext"
import { useNotificationDispatch } from "../context/NotificationContext"
import { setNotification } from "../reducers/NotificationReducer"

const BlogForm = ({ togglableBlogFormRef }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const blogsDispatch = useBlogsDispatch()
  const notificationDispatch = useNotificationDispatch()

  const newBlogMutation = useMutation({
    mutationFn: BlogService.create,
    onSuccess: (newBlog) => {
      emptyBlogForm()
      blogsDispatch({ type: "NEW_BLOG", payload: newBlog })
      setNotification(notificationDispatch, "NEW_BLOG", newBlog.title, 5)
    },
    onError: (error) => {
      setNotification(notificationDispatch, "ERROR", error.message, 5)
    },
  })

  const emptyBlogForm = () => {
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  const buttonStyle = {
    color: "white",
    backgroundColor: "#8FA998",
    margin: "5px",
  }

  const hrStyle = {
    border: "2px solid #CFD2CD",
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    newBlogMutation.mutate(newBlog)
    togglableBlogFormRef.current.toggleVisibility()
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
        <br />
        <br />
        <Button text="Add blog" onClick={handleNewBlog} style={buttonStyle} />
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  togglableBlogFormRef: PropTypes.object.isRequired,
}

export default BlogForm
