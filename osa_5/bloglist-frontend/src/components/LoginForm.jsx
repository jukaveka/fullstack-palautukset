import { useState } from "react"
import loginService from "../services/login"

const LoginForm = ({ setUser, setSuccessMessage, setErrorMessage }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem("LoggedBlogUser", JSON.stringify(user))
      setUser(user)

      setUsername("")
      setPassword("")
    } catch (exception) {
      console.log("error with logging in")
      console.log("Exception", exception.message)

      console.log("Setting error message")
      setErrorMessage("Wrong username or password")

      console.log("Setting timeout to clear error message in 5 seconds")
      setTimeout(() => {
        console.log("Clearing error message")
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <form>
        <div>
          <h2> Login </h2>
          <p> Username </p>
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            name="login-username"
          />
        </div>
        <div>
          <p> Password </p>
          <input
            type="text"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            name="login-password"
          />
        </div>
        <p>
          <button type="submit" onClick={handleLogin}> Login </button>
        </p>
      </form>
    </div>
  )
}

export default LoginForm