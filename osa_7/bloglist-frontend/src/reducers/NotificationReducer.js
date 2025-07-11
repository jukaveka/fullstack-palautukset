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
    case "LIKE":
      return {
        message: `You liked ${action.payload}`,
        type: "SUCCESS",
      }
    case "COMMENT":
      return {
        message: `You commented ${action.payload}`,
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

export const setSuccessNotification = (dispatch, type, payload) => {
  dispatch({ type: type, payload: payload })
  setTimeout(() => {
    dispatch({ type: "CLEAR" })
  }, 5000)
}

export const setErrorNotification = (dispatch, payload) => {
  dispatch({ type: "ERROR", payload: payload })
  setTimeout(() => {
    dispatch({ type: "CLEAR" })
  }, 5000)
}

export default NotificationReducer
