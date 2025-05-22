import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import LoggedUser from './components/LoggedUser'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const userInLocalStorage = window.localStorage.getItem("LoggedBlogUser")

    if (userInLocalStorage) {
      const user = JSON.parse(userInLocalStorage)

      setUser(user)
    }
  }, [])

  return (
    <div>
      {!user && (<LoginForm setUser={setUser} />)}
      {user && [
        <BlogList blogs={blogs} />,
        <BlogForm />,
        <LoggedUser user={user} setUser={setUser}/>
        ]}
    </div>
  )
}

export default App