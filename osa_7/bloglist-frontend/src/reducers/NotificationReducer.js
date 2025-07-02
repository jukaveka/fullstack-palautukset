const NotificationReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        message: `${action.payload} logged in`,
        type: "SUCCESS",
      }
    case "NEW_BLOG":
      return {
        message: `${action.payload} added to blogs`,
        type: "SUCCESS",
      }
    case "DELETE_BLOG":
      return {
        message: `${action.payload} removed from blogs`,
        type: "SUCCESS",
      }
    case "ERROR":
      return {
        message: `${action.payload}`,
        type: "ERROR",
      }
    case "CLEAR":
      return null
    default:
      return state
  }
}

export const setNotification = (dispatch, type, payload, timeout) => {
  dispatch({ type: type, payload: payload })
  setTimeout(() => {
    dispatch({ type: "CLEAR" })
  }, timeout * 1000)
}

export default NotificationReducer
