import BlogService from "../services/BlogService"
import { useUserValue } from "../context/UserContext"
import { useParams } from "react-router-dom"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { useNotificationDispatch } from "../context/NotificationContext"
import {
  setSuccessNotification,
  setErrorNotification,
} from "../reducers/NotificationReducer"
import { useState } from "react"
import {
  Box,
  Grid,
  Paper,
  Typography,
  IconButton,
  TextField,
} from "@mui/material"
import {
  Delete as DeleteIcon,
  Link as LinkIcon,
  ThumbUp as LikeIcon,
  AddComment as AddCommentIcon,
} from "@mui/icons-material"
import Comments from "./Comments"

const Blog = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const user = useUserValue()
  const params = useParams()
  const [comment, setComment] = useState("")

  const result = useQuery({
    queryKey: ["blog"],
    queryFn: () => BlogService.getById(params.id),
    refetchOnWindowFocus: false,
  })

  const blogRemovalMutation = useMutation({
    mutationFn: BlogService.remove,
    onSuccess: (data, variables) => {
      const blogs = queryClient.getQueryData(["blogs"])
      const removedBlogIndex = blogs.findIndex(
        (blog) => blog.id === variables.id
      )
      queryClient.setQueryData(["blogs"], blogs.toSpliced(removedBlogIndex, 1))
      setSuccessNotification(
        notificationDispatch,
        "DELETE_BLOG",
        `${variables.title} by ${variables.author}`
      )
    },
    onError: (error) => {
      setErrorNotification(notificationDispatch, error.message)
    },
  })

  const blogLikeMutation = useMutation({
    mutationFn: BlogService.addLike,
    onSuccess: (likedBlog) => {
      blog.likes = blog.likes + 1
      setSuccessNotification(
        notificationDispatch,
        "LIKE",
        `${likedBlog.title} by ${likedBlog.author}`
      )
    },
    onError: (error) => {
      setErrorNotification(notificationDispatch, error.message)
    },
  })

  const blogCommentMutation = useMutation({
    mutationFn: ({ id, comment }) => BlogService.addComment(id, comment),
    onSuccess: (commentedBlog) => {
      queryClient.setQueryData(["blog"], commentedBlog)
    },
    onError: (error) => {
      setErrorNotification(notificationDispatch, error.message)
    },
  })

  if (result.isLoading) {
    return <div> Fetching user information </div>
  }

  if (result.isError) {
    return <div> Could not fetch user information from server </div>
  }

  const blog = result.data
  const canDeleteBlog = blog.user.username === user.username

  const handleLike = () => {
    blogLikeMutation.mutate({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    })
  }

  const handleRemoval = () => {
    if (
      window.confirm(
        `Are you sure you want to remove blog ${blog.title} by ${blog.author}`
      )
    ) {
      blogRemovalMutation.mutate(blog)
    }
  }

  const handleComment = () => {
    blogCommentMutation.mutate({ id: blog.id, comment: { comment } })
  }

  return (
    <div>
      <Box
        sx={{ display: "flex", justifyContent: "center", paddingTop: "50px" }}
      >
        <Paper
          elevation={1}
          sx={{
            minWidth: 200,
            maxWidth: 700,
            flexGrow: 1,
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              textAlign: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <Grid size={12}>
              <Typography variant="h5">{blog.title}</Typography>
            </Grid>
            <Grid size={4}>
              <Typography>Written by</Typography>
              <Typography variant="h6">
                <b>{blog.author}</b>
              </Typography>
            </Grid>
            <Grid size={4}>
              <Typography>Times liked</Typography>
              <Typography variant="h6">
                <b>{blog.likes}</b>
              </Typography>
            </Grid>
            <Grid size={4}>
              <Typography>Times commented</Typography>
              <Typography variant="h6">
                <b>{blog.comments.length}</b>
              </Typography>
            </Grid>
            <Grid size={4}>
              <Typography>Added by</Typography>
              <Typography variant="h6">
                <b>{blog.user.name}</b>
              </Typography>
            </Grid>
            <Grid size={4}>
              <IconButton href={blog.url} size="large">
                <LinkIcon />
              </IconButton>
              <IconButton onClick={handleLike} size="large">
                <LikeIcon />
              </IconButton>
              {canDeleteBlog && (
                <IconButton onClick={handleRemoval} size="large">
                  <DeleteIcon />
                </IconButton>
              )}
              {!canDeleteBlog && (
                <IconButton size="large" disabled>
                  <DeleteIcon />
                </IconButton>
              )}
            </Grid>
            <Grid size={4}>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                  id="new-comment-input"
                  label="Add a new comment"
                  variant="standard"
                  value={comment}
                  onChange={({ target }) => setComment(target.value)}
                />
                <IconButton
                  size="large"
                  sx={{
                    marginLeft: 0.5,
                  }}
                >
                  <AddCommentIcon onClick={handleComment} />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", paddingTop: "50px" }}
      >
        <Paper
          elevation={1}
          sx={{
            minWidth: 200,
            maxWidth: 700,
            flexGrow: 1,
          }}
        >
          <Comments comments={blog.comments} />
        </Paper>
      </Box>
    </div>
  )
}

export default Blog
