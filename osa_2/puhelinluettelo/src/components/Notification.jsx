const Notification = ({ successMessage, errorMessage }) => {
  const successMessageStyle = {
    color: "#285238",
    fontSize: "20px",
    fontWeight: "bold",
    padding: "10px",
    border: "solid",
    borderColor: "#729EA1",
    borderSize: "10px"
  }

  if (successMessage === null && errorMessage === null) {
    return null
  }
  
  if (successMessage != null && errorMessage === null) {
    return (
      <div style={successMessageStyle}>
          <p> {successMessage} </p>
      </div>
    )
  }

  if (successMessage === null && errorMessage != null) {
    return (
      <div>
          <p> {errorMessage} </p>
      </div>
    )
  }
}

export default Notification