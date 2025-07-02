import { useState } from "react"
import Input from "./Input"
import Button from "./Button"
import loginService from "../services/login"
import blogService from "../services/blogs"
import PropTypes from "prop-types"

const LoginForm = ({ setUser, setSuccessMessage, setErrorMessage }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const buttonStyle = {
    color: "white",
    backgroundColor: "#4C5C68",
    margin: "2px"
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem("LoggedBlogUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)

      setUsername("")
      setPassword("")

      setSuccessMessage("Login successful")
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      console.log("error with logging in")
      console.log("Exception", exception.message)

      setErrorMessage("Wrong username or password")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
        <br /><br />
        <Button
          text="Login"
          onClick={handleLogin}
          style={buttonStyle}
        />
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired
}

export default LoginForm