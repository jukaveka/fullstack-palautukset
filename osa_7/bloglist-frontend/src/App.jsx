import { useEffect, useRef, useContext } from "react"
import BlogList from "./components/BlogList"
import LoginForm from "./components/LoginForm"
import LoggedUser from "./components/LoggedUser"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import BlogService from "./services/blogs"
import UserContext from "./context/UserContext"

const App = () => {
  const [user, userDispatch] = useContext(UserContext)

  useEffect(() => {
    const userInLocalStorage = window.localStorage.getItem("LoggedBlogUser")

    if (userInLocalStorage) {
      const user = JSON.parse(userInLocalStorage)

      userDispatch({ type: "SET_USER", payload: user })
      BlogService.setToken(user.token)
    }
  }, [])

  const togglableBlogFormRef = useRef({ toggleVisibility: () => {} })

  return (
    <div>
      <Notification />
      {!user && <LoginForm />}
      {user && [
        <BlogList key="Bloglist" user={user} />,
        <Togglable
          key="BlogForm"
          showLabel="Add new blog"
          hideLabel="Cancel"
          ref={togglableBlogFormRef}
        >
          <BlogForm togglableBlogFormRef={togglableBlogFormRef} />
        </Togglable>,
        <LoggedUser key="LoggedUser" />,
      ]}
    </div>
  )
}

export default App
