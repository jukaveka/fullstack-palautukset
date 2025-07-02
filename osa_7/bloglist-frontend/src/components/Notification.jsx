import PropTypes from "prop-types"
import { useNotificationState } from "../context/NotificationContext"

const Notification = () => {
  const notification = useNotificationState()

  const messageStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    padding: "2px",
    border: "solid",
    borderSize: "10px",
    width: "25em",
    textAlign: "center",
  }

  const successMessageStyle = {
    color: "white",
    backgroundColor: "#285238",
    borderColor: "#285238",
  }

  const errorMessageStyle = {
    color: "white",
    backgroundColor: "#9E2B14",
    borderColor: "#9E2B14",
  }

  if (!notification) {
    return null
  }

  if (notification.type === "SUCCESS") {
    return (
      <div style={{ ...messageStyle, ...successMessageStyle }}>
        <p> {notification.message} </p>
      </div>
    )
  }

  if (notification.type === "ERROR") {
    return (
      <div style={{ ...messageStyle, ...errorMessageStyle }}>
        <p> {notification.message} </p>
      </div>
    )
  }
}

Notification.propTypes = {
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string,
}

export default Notification
