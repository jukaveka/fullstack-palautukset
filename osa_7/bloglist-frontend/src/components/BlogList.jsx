import Blog from "./Blog"
import BlogService from "../services/blogs"
import PropTypes from "prop-types"
import { setNotification } from "../reducers/NotificationReducer"
import { useNotificationDispatch } from "../context/NotificationContext"

const BlogList = ({ user, blogs, setBlogs }) => {
  const notificationDispatch = useNotificationDispatch()

  const updateBlogLikes = async (blogWithUpdatedLikes) => {
    const updatedBlog = await BlogService.addLike(blogWithUpdatedLikes)
    updateBlogs(updatedBlog)
  }

  const updateBlogs = (updatedBlog) => {
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
      try {
        const response = await BlogService.remove(blogToRemove)

        const removedBlogIndex = blogs.findIndex(
          (blog) => blog.id === blogToRemove.id
        )
        const blogsAfterRemoval = blogs.toSpliced(removedBlogIndex, 1)

        setBlogs(blogsAfterRemoval)

        setNotification(
          notificationDispatch,
          "DELETE_BLOG",
          `${blogToRemove.title} by ${blogToRemove.author}`,
          5
        )
      } catch (exception) {
        setNotification(notificationDispatch, "ERROR", exception.message, 5)
      }
    }
  }

  const sortedBlogs = blogs.toSorted((a, b) => (a.likes > b.likes ? -1 : 1))

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
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
}

export default BlogList
