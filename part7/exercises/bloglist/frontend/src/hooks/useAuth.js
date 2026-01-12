import { useDispatch } from 'react-redux'

import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser, clearUser } from '../reducers/authReducer'
import { useNotify } from './useNotify'

const useAuth = () => {
  const dispatch = useDispatch()
  const notify = useNotify()

  return {
    login: async (userData) => {
      try {
        const user = await loginService.login(userData)

        blogService.setToken(user.token)
        window.localStorage.setItem('loggedInBlogAppUser', JSON.stringify(user))
        dispatch(setUser(user))
      } catch {
        notify('Error: incorrect credentials', { isError: true })
      }
    },
    logout: () => {
      dispatch(clearUser())
      window.localStorage.removeItem('loggedInBlogAppUser')
    },
    restoreUser: () => {
      const loggedInUserJSON = window.localStorage.getItem(
        'loggedInBlogAppUser'
      )
      if (loggedInUserJSON) {
        const user = JSON.parse(loggedInUserJSON)
        dispatch(setUser(user))
        blogService.setToken(user.token)
      }
    },
  }
}

export default useAuth
