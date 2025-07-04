import { useState } from "react"
import Input from "./Input"
import Button from "./Button"
import loginService from "../services/login"
import blogService from "../services/blogs"
import PropTypes from "prop-types"
import { useNotificationDispatch } from "../context/NotificationContext"
import {
  setErrorNotification,
  setSuccessNotification,
} from "../reducers/NotificationReducer"
import { useUserDispatch } from "../context/UserContext"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const userDispatch = useUserDispatch()
  const notificationDispatch = useNotificationDispatch()

  const buttonStyle = {
    color: "white",
    backgroundColor: "#4C5C68",
    margin: "2px",
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem("LoggedBlogUser", JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch({ type: "SET_USER", payload: user })

      setUsername("")
      setPassword("")

      setSuccessNotification(notificationDispatch, "LOGIN", user.username)
    } catch (exception) {
      console.log("error with logging in")
      console.log("Exception", exception.message)

      setErrorNotification(notificationDispatch, exception.message)
    }
  }

  return (
    <div>
      <h2> Login </h2>
      <form data-testid="loginform">
        <Input
          label="Username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <Input
          label="Password"
          type="text"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <br />
        <Button text="Login" onClick={handleLogin} style={buttonStyle} />
      </form>
    </div>
  )
}

export default LoginForm
