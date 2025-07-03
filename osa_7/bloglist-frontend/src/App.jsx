import { useState, useEffect, useRef } from "react"
import BlogList from "./components/BlogList"
import LoginForm from "./components/LoginForm"
import LoggedUser from "./components/LoggedUser"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import BlogService from "./services/blogs"
import { BlogContextProvider } from "./context/BlogContext"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userInLocalStorage = window.localStorage.getItem("LoggedBlogUser")

    if (userInLocalStorage) {
      const user = JSON.parse(userInLocalStorage)

      setUser(user)
      BlogService.setToken(user.token)
    }
  }, [])

  const togglableBlogFormRef = useRef({ toggleVisibility: () => {} })
  // Move toggle visibility to BlogForm component
  // togglableBlogFormRef.current.toggleVisibility()

  return (
    <div>
      <BlogContextProvider>
        <Notification />
        {!user && <LoginForm setUser={setUser} />}
        {user && [
          <BlogList key="Bloglist" user={user} setBlogs={setBlogs} />,
          <Togglable
            key="BlogForm"
            showLabel="Add new blog"
            hideLabel="Cancel"
            ref={togglableBlogFormRef}
          >
            <BlogForm togglableBlogFormRef={togglableBlogFormRef} />
          </Togglable>,
          <LoggedUser key="LoggedUser" user={user} setUser={setUser} />,
        ]}
      </BlogContextProvider>
    </div>
  )
}

export default App
