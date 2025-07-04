const BlogReducer = (state, action) => {
  switch (action.type) {
    case "NEW_BLOG":
      return state.concat(action.payload)
    case "REMOVE":
      return state.toSpliced(action.payload, 1)
    default:
      return state
  }
}

export default BlogReducer
