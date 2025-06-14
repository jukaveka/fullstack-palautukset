import Button from "./Button"
import PropTypes from "prop-types"

const LoggedUser = ({ user, setUser }) => {
  const logoutButtonStyle = {
    color: "white",
    backgroundColor: "#4C5C68",
    margin: "2px"
  }

  const hrStyle = {
    border: "2px solid #CFD2CD"
  }

  const handleLogout = event => {
    window.localStorage.removeItem("LoggedBlogUser")
    setUser(null)
  }

  return (
    <div>
      <hr style={hrStyle} />
      <p> Logged in as {user.name} </p>
      <Button text="Logout" onClick={handleLogout} style={logoutButtonStyle}/>
    </div>
  )
}

LoggedUser.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired
}

export default LoggedUser