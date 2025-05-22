import { useState } from "react"
import Input from "./Input"
import Button from "./Button"

const BlogForm = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleNewBlog = event => {
    event.preventDefault()

    console.log("Button clicked to add new blog")
    console.log("User has inputted following for new blog")
    console.log("Title", title)
    console.log("Author", author)
    console.log("URL", url)
  }

  return (
    <div>
      <hr />
      <h2> Add new blog </h2>
      <form>
        <Input
          label="Title"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <Input 
          label="Author"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <Input 
          label="URL"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <Button 
          text="Add blog"
          onClick={handleNewBlog}
        />
      </form>
    </div>
  )
}

export default BlogForm