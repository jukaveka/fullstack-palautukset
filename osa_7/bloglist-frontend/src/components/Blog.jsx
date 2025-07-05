import Button from "./Button"
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
import Input from "./Input"

const Blog = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const user = useUserValue()
  const params = useParams()
  const [comment, setComment] = useState("")

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

  const result = useQuery({
    queryKey: ["blog"],
    queryFn: () => BlogService.getById(params.id),
    refetchOnWindowFocus: false,
  })

  if (result.isLoading) {
    return <div> Fetching user information </div>
  }

  if (result.isError) {
    return <div> Could not fetch user information from server </div>
  }

  const blog = result.data

  const removalButtonStyle = {
    color: "white",
    backgroundColor: "#DB5461",
    margin: "5px",
  }

  const likeButtonStyle = {
    color: "white",
    backgroundColor: "#8FA998",
    margin: "0px 10px",
  }

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
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p data-testid="blogLikes">
        likes {blog.likes}
        <Button text="Like" onClick={handleLike} style={likeButtonStyle} />
      </p>
      <p>Added to list by {blog.user.name}</p>
      {blog.user.username === user.username && (
        <Button
          text="Remove"
          onClick={handleRemoval}
          style={removalButtonStyle}
        />
      )}
      <h3> Comments </h3>
      <Input
        label="New comment"
        type="text"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <Button text="Add" onClick={handleComment} style={likeButtonStyle} />
      <ul>
        {blog.comments.map((comment, index) => {
          return <li key={`blog-comment-${index}`}> {comment} </li>
        })}
      </ul>
    </div>
  )
}

export default Blog
