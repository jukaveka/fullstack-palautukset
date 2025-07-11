const notificationReducer = (state, action) => {
  switch (action.type) {
    case "NEW_ANECDOTE":
      return `Anecdote "${action.payload}" added to the list`
    case "VOTE":
      return `Anecdote "${action.payload}" voted`
    case "ERROR":
      return action.payload
    case "CLEAR":
      return null
    default:
      return state
  }
}

export const setNotification = (dispatch, type, message, timeoutInSeconds) => {
  dispatch({ type: type, payload: message })
  setTimeout(() => {
    dispatch({ type: "CLEAR" })
  }, timeoutInSeconds * 1000)
}

export default notificationReducer