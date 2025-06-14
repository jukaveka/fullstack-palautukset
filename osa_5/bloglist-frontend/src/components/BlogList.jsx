import Blog from "./Blog"
import BlogService from "../services/blogs"
import PropTypes from "prop-types"

const BlogList = ({ user, blogs, setBlogs, setSuccessMessage, setErrorMessage }) => {
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
    if (window.confirm(`Are you sure you want to remove blog ${blogToRemove.title} by ${blogToRemove.author}`)) {
      try {
        const response = await BlogService.remove(blogToRemove)

        const removedBlogIndex = blogs.findIndex((blog) => blog.id === blogToRemove.id)
        const blogsAfterRemoval = blogs.toSpliced(removedBlogIndex, 1)

        setBlogs(blogsAfterRemoval)

        setSuccessMessage(`Blog ${blogToRemove.title} from ${blogToRemove.author} removed from list.`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      } catch (exception) {
        setErrorMessage(exception.message)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }

    }
  }

  const sortedBlogs = blogs.toSorted((a, b) => a.likes > b.likes ? -1 : 1)

  return (
    <div>
      <h2>All blogs</h2>
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          user={user}
          blog={blog}
          updateBlogLikes={updateBlogLikes}
          removeBlog={() => removeBlogBy(blog)}
        />
      )}
    </div>
  )
}

BlogList.propTypes = {
  user: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired
}

export default BlogList