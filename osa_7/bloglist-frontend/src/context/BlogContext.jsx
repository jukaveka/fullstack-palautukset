import { createContext, useContext, useReducer } from "react"
import BlogReducer from "../reducers/BlogReducer"

const BlogContext = createContext()

export const BlogContextProvider = (props) => {
  const [blogs, blogsDispatch] = useReducer(BlogReducer, [])

  return (
    <BlogContext.Provider value={[blogs, blogsDispatch]}>
      {props.children}
    </BlogContext.Provider>
  )
}

export const useBlogsState = () => {
  const blogContext = useContext(BlogContext)
  return blogContext[0]
}

export const useBlogsDispatch = () => {
  const blogContext = useContext(BlogContext)
  return blogContext[1]
}

export default BlogContext
