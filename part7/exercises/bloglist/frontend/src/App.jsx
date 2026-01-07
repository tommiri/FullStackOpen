import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { useBlogs } from './hooks/useBlogs'
import { useAuth } from './hooks/useAuth'

import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import UserList from './components/UserList'

const App = () => {
  const user = useSelector(({ user }) => user)

  const { initializeBlogs } = useBlogs()
  const { logout } = useAuth()

  const blogFormRef = useRef()

  useEffect(() => {
    const getBlogs = async () => {
      await initializeBlogs()
    }
    getBlogs()
  }, [initializeBlogs])

  const handleLogout = (e) => {
    e.preventDefault()

    logout()
  }

  return (
    <div>
      {!user && (
        <>
          <h1>Log in to application</h1>
          <Notification />
          <LoginForm />
        </>
      )}
      {user && (
        <>
          <h2>blogs</h2>
          <Notification />
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <NewBlogForm blogFormRef={blogFormRef}></NewBlogForm>
          </Togglable>
          <BlogList />
          <UserList />
        </>
      )}
    </div>
  )
}

export default App
