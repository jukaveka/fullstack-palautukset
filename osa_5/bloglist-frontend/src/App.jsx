import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import LoggedUser from './components/LoggedUser'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      {(successMessage || errorMessage) && (<Notification successMessage={successMessage} errorMessage={errorMessage} />)}
      {!user && (<LoginForm setUser={setUser} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />)}
      {user && [
        <BlogList key="Bloglist" blogs={blogs} setBlogs={setBlogs} />,
        <Togglable key="BlogForm" showLabel="Add new blog" hideLabel="Cancel" >
          <BlogForm blogs={blogs} setBlogs={setBlogs} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />
        </Togglable>,
        <LoggedUser key="LoggedUser" user={user} setUser={setUser} />
      ]}
    </div>
  )
}

export default App