const LoggedUser = ({ user, setUser }) => {
  const handleLogout = event => {
    window.localStorage.removeItem("LoggedBlogUser")
    setUser(null)
  }

  return (
    <div>
      <hr />
      <p> Logged in as {user.name} </p>
      <p>
        <button onClick={handleLogout}> Logout </button>
      </p>
    </div>
  )
}

export default LoggedUser