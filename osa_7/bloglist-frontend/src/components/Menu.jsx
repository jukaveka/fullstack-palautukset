import { Link } from "react-router-dom"
import UserContext from "../context/UserContext"
import { useContext } from "react"
import Button from "./Button"

const Menu = () => {
  const [user, userDispatch] = useContext(UserContext)

  const logoutButtonStyle = {
    color: "white",
    backgroundColor: "#4C5C68",
    margin: "2px",
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem("LoggedBlogUser")
    userDispatch({ type: "CLEAR_USER" })
  }

  if (!user) {
    return null
  }

  return (
    <>
      <Link to="/blogs"> Blogs </Link>
      <Link to="/users"> Users </Link>
      Logged as {user.name}
      <Button text="Logout" onClick={handleLogout} style={logoutButtonStyle} />
    </>
  )
}

export default Menu
