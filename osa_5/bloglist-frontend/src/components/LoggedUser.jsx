import Button from './Button'

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

export default LoggedUser