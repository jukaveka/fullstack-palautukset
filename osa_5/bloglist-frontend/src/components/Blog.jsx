import Togglable from "./Togglable"
import Button from "./Button"

const Blog = ({ blog }) => {
  const handleLike = () => {
    console.log("Jeps")
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