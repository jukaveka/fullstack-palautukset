const notificationReducer = (state, action) => {
  switch (action.type) {
    case "NEW_ANECDOTE":
      return `Anecdote "${action.payload}" added to anecdotes`
    case "VOTE":
      return `Anecdote "${action.payload}" voted`
    case "CLEAR":
      return null
    default:
      return state
  }
}

export default notificationReducer