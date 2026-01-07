import { useEffect, useState } from 'react'

import { useAuth } from '../hooks/useAuth'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { login, restoreUser } = useAuth()

  useEffect(restoreUser, [restoreUser])

  const handleLogin = async (e) => {
    e.preventDefault()

    await login({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">LOGIN</button>
    </form>
  )
}

export default LoginForm
