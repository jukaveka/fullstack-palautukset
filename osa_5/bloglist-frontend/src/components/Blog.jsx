import Togglable from "./Togglable"
import Button from "./Button"
import blogService from "../services/blogs"

const Blog = ({ blog, updateBlogs }) => {
  const handleLike = async () => {
    const newLikes = blog.likes + 1
    const updatedBlog = {...blog, likes: newLikes, user: blog.user.id}

    const returnedBlog = await blogService.addLike(updatedBlog)
    updateBlogs(returnedBlog)
  }

  return (
    <div>
      {blog.title} {blog.author}
      <Togglable showLabel="View" hideLabel="Hide">
        <p>{blog.url}</p>
        <p>likes {blog.likes} <Button text="Like" onClick={handleLike} /></p>
        <p>{blog.user.name}</p>
      </Togglable>
    </div>
  )
}


export default Blog