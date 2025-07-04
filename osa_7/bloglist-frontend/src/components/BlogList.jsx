import Blog from "./Blog"
import BlogService from "../services/blogs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  setErrorNotification,
  setSuccessNotification,
} from "../reducers/NotificationReducer"
import { useNotificationDispatch } from "../context/NotificationContext"

const BlogList = () => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: BlogService.getAll,
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
      setErrorNotification(notificationDispatch, "ERROR", error.message)
    },
  })

  const blogLikeMutation = useMutation({
    mutationFn: BlogService.addLike,
    onSuccess: (likedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"])
      const likedBlogIndex = blogs.findIndex((blog) => blog.id === likedBlog.id)
      queryClient.setQueryData(
        ["blogs"],
        blogs.toSpliced(likedBlogIndex, 1, likedBlog)
      )
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

  if (result.isPending) {
    return <div> Loading blog data </div>
  }

  if (result.isError) {
    return <div> Error fetching blogs. ${result.error}</div>
  }

  const blogs = result.data

  const sortedBlogs = blogs.toSorted((a, b) => (a.likes > b.likes ? -1 : 1))

  const handleBlogLike = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    blogLikeMutation.mutate(updatedBlog)
  }

  const removeBlogBy = async (blogToRemove) => {
    if (
      window.confirm(
        `Are you sure you want to remove blog ${blogToRemove.title} by ${blogToRemove.author}`
      )
    ) {
      blogRemovalMutation.mutate(blogToRemove)
    }
  }

  return (
    <div>
      <h2>All blogs</h2>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={handleBlogLike}
          removeBlog={() => removeBlogBy(blog)}
        />
      ))}
    </div>
  )
}

export default BlogList
