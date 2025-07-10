import { useEffect, useContext } from "react"
import BlogList from "./components/BlogList"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"
import UserList from "./components/UserList"
import User from "./components/User"
import AppNav from "./components/AppBar"
import Blog from "./components/Blog"
import BlogService from "./services/BlogService"
import UserContext from "./context/UserContext"
import { Routes, Route } from "react-router-dom"
import { Container } from "@mui/material"
import Home from "./components/Home"

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

  return (
    <Container>
      <AppNav />
      <Notification />
      {!user && <LoginForm />}
      <Routes key="Routes">
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/blogs/new" element={<BlogForm />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </Container>
  )
}

export default App
