import loginService from "../services/login"
import blogService from "../services/BlogService"
import { useNotificationDispatch } from "../context/NotificationContext"
import { useUserDispatch } from "../context/UserContext"
import {
  setErrorNotification,
  setSuccessNotification,
} from "../reducers/NotificationReducer"

import { useState } from "react"
import { Box, Button, Paper, TextField, Typography } from "@mui/material"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const userDispatch = useUserDispatch()
  const notificationDispatch = useNotificationDispatch()

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
      <Box
        component="form"
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "50px",
        }}
      >
        <Paper
          elevation={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: 200,
            maxWidth: 400,
            flexGrow: 1,
            padding: "20px",
          }}
        >
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Login
          </Typography>
          <TextField
            id="login-form-username"
            label="Username"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <TextField
            id="login-form-password"
            label="Password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button onClick={handleLogin}> Submit </Button>
        </Paper>
      </Box>
    </div>
  )
}

export default LoginForm
