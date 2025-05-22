const LoggedUser = ({ user }) => {
  return (
    <div>
      <hr/>
      <p> Logged in as {user.name} </p>
    </div>
  )
}

export default LoggedUser