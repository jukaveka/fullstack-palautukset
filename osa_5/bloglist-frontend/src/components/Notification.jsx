import PropTypes from "prop-types"

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

  if (successMessage) {
    return (
      <div style={successMessageStyle}>
        <p> {successMessage} </p>
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div style={errorMessageStyle}>
        <p> {errorMessage} </p>
      </div>
    )
  }

  return null
}

Notification.propTypes = {
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string
}

export default Notification