import Togglable from "./Togglable"
import Button from "./Button"
import PropTypes from "prop-types"

const Blog = ({ blog, user, updateBlogLikes, removeBlog }) => {
  const blogStyle = {
    padding: "5px",
    margin: "5px",
    border: "solid",
    borderColor: "#CFD2CD"
  }
  const removalButtonStyle = {
    color: "white",
    backgroundColor: "#DB5461",
    margin: "5px"
  }

  const likeButtonStyle = {
    color: "white",
    backgroundColor: "#8FA998"
  }

  const handleLike = async () => {
    const newLikes = blog.likes + 1
    const updatedBlog = { ...blog, likes: newLikes, user: blog.user.id }

    await updateBlogLikes(updatedBlog)
  }

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <Togglable showLabel="View" hideLabel="Hide">
        <p>{blog.url}</p>
        <p data-testid="blogLikes">likes {blog.likes} <Button text="Like" onClick={handleLike} style={likeButtonStyle}/></p>
        <p>{blog.user.name}</p>
        {(blog.user.username === user.username) && (<Button text="Remove" onClick={removeBlog} style={removalButtonStyle} />)}
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateBlogLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog