import { useState, useEffect, useRef } from "react"
import BlogList from "./components/BlogList"
import LoginForm from "./components/LoginForm"
import LoggedUser from "./components/LoggedUser"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import BlogService from "./services/blogs"
import {
  NotificationContextProvider,
  useNotificationDispatch,
} from "./context/NotificationContext"
import { setNotification } from "./reducers/NotificationReducer"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const notificationDispatch = useNotificationDispatch()

  useEffect(() => {
    BlogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const userInLocalStorage = window.localStorage.getItem("LoggedBlogUser")

    if (userInLocalStorage) {
      const user = JSON.parse(userInLocalStorage)

      setUser(user)
      BlogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()
  const togglableBlogFormRef = useRef()

  const createNewBlog = async (newBlog) => {
    try {
      const addedBlog = await BlogService.create(newBlog)

      const newBlogs = blogs.concat(addedBlog)
      setBlogs(newBlogs)
      togglableBlogFormRef.current.toggleVisibility()
      blogFormRef.current.emptyBlogForm()
      setNotification(notificationDispatch, "NEW_BLOG", addedBlog.title, 5)
    } catch (exception) {
      setNotification(notificationDispatch, "ERROR", exception.message, 5)
    }
  }

  return (
    <div>
      <Notification />
      {!user && <LoginForm setUser={setUser} />}
      {user && [
        <BlogList
          key="Bloglist"
          user={user}
          blogs={blogs}
          setBlogs={setBlogs}
        />,
        <Togglable
          key="BlogForm"
          showLabel="Add new blog"
          hideLabel="Cancel"
          ref={togglableBlogFormRef}
        >
          <BlogForm createNewBlog={createNewBlog} ref={blogFormRef} />
        </Togglable>,
        <LoggedUser key="LoggedUser" user={user} setUser={setUser} />,
      ]}
    </div>
  )
}

export default App
