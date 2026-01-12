import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useAuth from '../hooks/useAuth'

import { Form, Button, FloatingLabel } from 'react-bootstrap'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { login, restoreUser } = useAuth()
  const navigate = useNavigate()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(restoreUser, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    await login({ username, password })
    setUsername('')
    setPassword('')
    navigate('/')
  }

  return (
    <>
      <h1 className="mb-3">Sign in</h1>

      <Form onSubmit={handleLogin}>
        <FloatingLabel label="Username" className="mb-3">
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </FloatingLabel>
        <FloatingLabel label="Password" className="mb-3">
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </FloatingLabel>
        <Button variant="primary" type="submit">
          Sign in
        </Button>
      </Form>
    </>
  )
}

export default LoginForm
