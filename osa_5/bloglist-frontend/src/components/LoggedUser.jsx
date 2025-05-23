import Button from './Button'

const LoggedUser = ({ user, setUser }) => {
  const handleLogout = event => {
    window.localStorage.removeItem("LoggedBlogUser")
    setUser(null)
  }

  return (
    <div>
      <hr />
      <p> Logged in as {user.name} </p>
      <Button text="Logout" onClick={handleLogout} />
    </div>
  )
}

export default LoggedUser