import { useEffect, useRef, useContext } from "react"
import BlogList from "./components/BlogList"
import LoginForm from "./components/LoginForm"
import LoggedUser from "./components/LoggedUser"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import UserList from "./components/UserList"
import User from "./components/User"
import BlogService from "./services/blogs"
import UserContext from "./context/UserContext"
import { Link, Routes, Route } from "react-router-dom"
import Menu from "./components/Menu"

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
      <Menu />
      <Notification />
      {!user && <LoginForm />}
      {user && [
        <Togglable
          key="BlogForm"
          showLabel="Add new blog"
          hideLabel="Cancel"
          ref={togglableBlogFormRef}
        >
          <BlogForm togglableBlogFormRef={togglableBlogFormRef} />
        </Togglable>,
        <LoggedUser key="LoggedUser" />,
        <Routes key="Routes">
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>,
      ]}
    </div>
  )
}

export default App
