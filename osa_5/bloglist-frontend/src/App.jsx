import { useState, useEffect } from "react"
import BlogList from "./components/BlogList"
import LoginForm from "./components/LoginForm"
import LoggedUser from "./components/LoggedUser"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import BlogService from "./services/blogs"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    BlogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const userInLocalStorage = window.localStorage.getItem("LoggedBlogUser")

    if (userInLocalStorage) {
      const user = JSON.parse(userInLocalStorage)

      setUser(user)
      BlogService.setToken(user.token)
    }
  }, [])

  const createNewBlog = async (newBlog) => {
    try {
      const addedBlog = await BlogService.create(newBlog)

      const newBlogs = blogs.concat(addedBlog)
      setBlogs(newBlogs)

      setSuccessMessage(`${addedBlog.title} added to list`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(`Adding blog failed - ${exception.message}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      {(successMessage || errorMessage) && (<Notification successMessage={successMessage} errorMessage={errorMessage} />)}
      {!user && (<LoginForm setUser={setUser} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />)}
      {user && [
        <BlogList key="Bloglist" user={user} blogs={blogs} setBlogs={setBlogs} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />,
        <Togglable key="BlogForm" showLabel="Add new blog" hideLabel="Cancel" >
          <BlogForm createNewBlog={createNewBlog} />
        </Togglable>,
        <LoggedUser key="LoggedUser" user={user} setUser={setUser} />
      ]}
    </div>
  )
}

export default App