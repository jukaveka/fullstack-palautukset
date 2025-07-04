import Blog from "./Blog"
import BlogService from "../services/blogs"
import PropTypes from "prop-types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { setNotification } from "../reducers/NotificationReducer"
import { useNotificationDispatch } from "../context/NotificationContext"
import { useBlogsDispatch } from "../context/BlogContext"

const BlogList = ({ user, setBlogs }) => {
  const notificationDispatch = useNotificationDispatch()
  const blogsDispatch = useBlogsDispatch()

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: BlogService.getAll,
    refetchOnWindowFocus: false,
  })

  const blogRemovalMutation = useMutation({
    mutationFn: BlogService.remove,
    onSuccess: (data, variables) => {
      blogsDispatch({ type: "REMOVE", payload: variables.id })
      setNotification(
        notificationDispatch,
        "DELETE_BLOG",
        `${variables.title} by ${variables.author}`,
        5
      )
    },
    onError: (error) => {
      setNotification(notificationDispatch, "ERROR", error.message, 5)
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

  const updateBlogLikes = async (blogWithUpdatedLikes) => {
    const updatedBlog = await BlogService.addLike(blogWithUpdatedLikes)

    const blogIndex = blogs.findIndex((blog) => blog.id === updatedBlog.id)

    const updatedBlogs = blogs.toSpliced(blogIndex, 1, updatedBlog)

    setBlogs(updatedBlogs)
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
          user={user}
          blog={blog}
          updateBlogLikes={updateBlogLikes}
          removeBlog={() => removeBlogBy(blog)}
        />
      ))}
    </div>
  )
}

BlogList.propTypes = {
  user: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
}

export default BlogList
