const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_FILTER":
      console.log("filterReducer, action SET_FILTER, payload", action.payload)
      return action.payload
    default:
      return state
  }
}

export const setFilter = (filter) => {
  return {
    type: "SET_FILTER",
    payload: filter
  }
}

export default filterReducer