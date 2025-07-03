const BlogReducer = (state, action) => {
  switch (action.type) {
    case "NEW_BLOG":
      return state.concat(action.payload)
    default:
      return state
  }
}

export default BlogReducer
