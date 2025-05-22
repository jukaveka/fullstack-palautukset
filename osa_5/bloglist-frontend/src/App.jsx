import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import LoggedUser from './components/LoggedUser'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  return (
    <div>
      {!user && (<LoginForm setUser={setUser} />)}
      {user && [
        <BlogList blogs={blogs} />,
        <LoggedUser user={user} />
        ]}
    </div>
  )
}

export default App