import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import BlogService from "../services/BlogService"
import { useNotificationDispatch } from "../context/NotificationContext"
import {
  setErrorNotification,
  setSuccessNotification,
} from "../reducers/NotificationReducer"
import { Box, Button, Input, Paper, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const BlogForm = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const navigate = useNavigate()

  const newBlogMutation = useMutation({
    mutationFn: BlogService.create,
    onSuccess: (newBlog) => {
      emptyBlogForm()

      const blogs = queryClient.getQueryData(["blogs"])
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog))

      setSuccessNotification(notificationDispatch, "NEW_BLOG", newBlog.title)
      navigate(`../blogs/${newBlog.id}`)
    },
    onError: (error) => {
      setErrorNotification(notificationDispatch, error.message)
    },
  })

  const emptyBlogForm = () => {
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    newBlogMutation.mutate(newBlog)
  }

  return (
    <div>
      <Box
        component="form"
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "50px",
        }}
      >
        <Paper
          elevation={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: 200,
            maxWidth: 400,
            flexGrow: 1,
            padding: "20px",
          }}
        >
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Add new blog
          </Typography>
          <TextField
            id="new-blog-title"
            label="Title"
            variant="outlined"
            margin="normal"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <TextField
            id="new-blog-author"
            label="Author"
            variant="outlined"
            margin="normal"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <TextField
            id="new-blog-url"
            label="URL"
            variant="outlined"
            margin="normal"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button onClick={handleNewBlog}> Submit </Button>
        </Paper>
      </Box>
    </div>
  )
}

export default BlogForm
