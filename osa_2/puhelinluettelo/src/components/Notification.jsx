const Notification = ({ successMessage, errorMessage }) => {
  const successMessageStyle = {
    color: "#285238",
    fontSize: "20px",
    fontWeight: "bold",
    padding: "10px",
    border: "solid",
    borderColor: "#285238",
    borderSize: "10px"
  }

  const errorMessageStyle = {
    color: "#9E2B14",
    fontSize: "20px",
    fontWeight: "bold",
    padding: "10px",
    border: "solid",
    borderColor: "#9E2B14",
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
      <div style={errorMessageStyle}>
          <p> {errorMessage} </p>
      </div>
    )
  }
}

export default Notification