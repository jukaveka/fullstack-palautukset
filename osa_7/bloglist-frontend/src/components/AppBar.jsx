import { Link } from "react-router-dom"
import UserContext from "../context/UserContext"
import { useContext, useState } from "react"
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { useNavigate } from "react-router-dom"

const AppNav = () => {
  const [user, userDispatch] = useContext(UserContext)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem("LoggedBlogUser")
    userDispatch({ type: "CLEAR_USER" })
    navigate("/")
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            flexGrow: "xl",
          }}
        >
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>

          <Button color="inherit" component={Link} to="/blogs">
            Blogs
          </Button>

          <Button color="inherit" component={Link} to="/blogs/new">
            Add blog
          </Button>

          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
        </Box>
        <>
          <IconButton size="large" onClick={handleMenuOpen} color="inherit">
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="user-menu"
            open={open}
            anchorEl={anchorEl}
            onClose={handleMenuClose}
            keepMounted
          >
            {user && (
              <>
                <MenuItem onClick={handleMenuClose}> {user.username} </MenuItem>
                <MenuItem onClick={handleLogout}> Logout </MenuItem>
              </>
            )}
            {!user && (
              <MenuItem component={Link} to="/">
                Login
              </MenuItem>
            )}
          </Menu>
        </>
      </Toolbar>
    </AppBar>
  )
}

export default AppNav
