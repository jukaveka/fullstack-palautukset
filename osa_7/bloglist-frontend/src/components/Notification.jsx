import { useNotificationState } from "../context/NotificationContext"
import { Alert, Box } from "@mui/material"

const Notification = () => {
  const notification = useNotificationState()

  if (!notification) {
    return null
  }

  const severity = notification.type === "SUCCESS" ? "success" : "error"

  return (
    <div>
      {" "}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "25px",
        }}
      >
        <Alert
          severity={severity}
          sx={{
            minWidth: 200,
            maxWidth: 400,
            minHeight: 50,
            maxHeight: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {notification.message}
        </Alert>
      </Box>
    </div>
  )
}

export default Notification
