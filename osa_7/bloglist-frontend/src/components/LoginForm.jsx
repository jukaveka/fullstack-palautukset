import loginService from "../services/login"
import blogService from "../services/BlogService"
import { useNotificationDispatch } from "../context/NotificationContext"
import { useUserDispatch } from "../context/UserContext"
import {
  setErrorNotification,
  setSuccessNotification,
} from "../reducers/NotificationReducer"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [visiblePassword, setVisiblePassword] = useState(false)
  const userDispatch = useUserDispatch()
  const notificationDispatch = useNotificationDispatch()

  const loginMutation = useMutation({
    mutationFn: loginService.login,
    onSuccess: (user) => {
      window.localStorage.setItem("LoggedBlogUser", JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch({ type: "SET_USER", payload: user })

      setUsername("")
      setPassword("")

      setSuccessNotification(notificationDispatch, "LOGIN", user.username)
    },
    onError: (error) => {
      setErrorNotification(notificationDispatch, error.message)
    },
  })

  const handleLogin = async (event) => {
    event.preventDefault()

    loginMutation.mutate({ username: username, password: password })
  }

  const handlePasswordVisibilityChange = () => {
    setVisiblePassword(!visiblePassword)
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
            type={visiblePassword ? "text" : "password"}
            variant="outlined"
            margin="normal"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onMouseDown={handlePasswordVisibilityChange}
                      onMouseUp={handlePasswordVisibilityChange}
                    >
                      {visiblePassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button onClick={handleLogin}> Submit </Button>
        </Paper>
      </Box>
    </div>
  )
}

export default LoginForm
