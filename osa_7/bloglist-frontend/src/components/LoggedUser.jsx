import { useContext } from "react"
import Button from "./Button"
import UserContext from "../context/UserContext"

const LoggedUser = () => {
  const [user, userDispatch] = useContext(UserContext)
  const logoutButtonStyle = {
    color: "white",
    backgroundColor: "#4C5C68",
    margin: "2px",
  }

  const hrStyle = {
    border: "2px solid #CFD2CD",
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem("LoggedBlogUser")
    userDispatch({ type: "CLEAR_USER" })
  }

  return (
    <div>
      <hr style={hrStyle} />
      <p> Logged in as {user.name} </p>
      <Button text="Logout" onClick={handleLogout} style={logoutButtonStyle} />
    </div>
  )
}

export default LoggedUser
