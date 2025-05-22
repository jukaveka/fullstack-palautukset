import { useState } from "react"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (event) => {
    event.preventDefault()

    console.log("Login attempt")
    console.log("Username", username)
    console.log("Password", password)
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