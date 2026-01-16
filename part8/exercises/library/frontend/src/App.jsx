import { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client/react'

import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

import { ALL_BOOKS } from './queries'

import Navigation from './components/Navigation'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'

const ProtectedRoute = ({ token, redirectPath = '/login' }) => {
  if (!token) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const [errorMessage, setErrorMessage] = useState(null)

  const client = useApolloClient()

  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return <div>loading...</div>
  }

  const allBooks = result.data.allBooks

  const onLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div>
      <Navigation token={token} onLogout={onLogout} />
      <Notify errorMessage={errorMessage} />

      <Routes>
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/" replace />
            ) : (
              <LoginForm setError={notify} setToken={setToken} />
            )
          }
        />

        <Route path="/" element={<Authors setError={notify} token={token} />} />
        <Route path="/books" element={<Books allBooks={allBooks} />} />

        <Route element={<ProtectedRoute token={token} />}>
          <Route path="/new" element={<NewBook setError={notify} />} />
          <Route
            path="/recommended"
            element={<Recommended allBooks={allBooks} />}
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
