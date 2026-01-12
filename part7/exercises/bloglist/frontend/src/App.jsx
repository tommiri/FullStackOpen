import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

import useBlogs from './hooks/useBlogs'
import useUsers from './hooks/useUsers'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import Navigation from './components/Navigation'

const ProtectedRoute = ({ user, redirectPath = '/login' }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}

const App = () => {
  const user = useSelector(({ user }) => user)

  const { initializeBlogs } = useBlogs()
  const { initializeUsers } = useUsers()

  useEffect(() => {
    const initializeResources = async () => {
      await initializeBlogs()
      await initializeUsers()
    }
    initializeResources()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container">
      <Navigation user={user} />
      <Notification />

      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <LoginForm />}
        />

        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/" element={<BlogList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog user={user} />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to={user ? '/' : '/login'} replace />}
        />
      </Routes>
    </div>
  )
}

export default App
