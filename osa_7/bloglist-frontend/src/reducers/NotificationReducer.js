const NotificationReducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS_LOGIN":
      return {
        message: `${action.payload} logged in`,
        type: "SUCCESS",
      }
    case "ERROR_LOGIN":
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
