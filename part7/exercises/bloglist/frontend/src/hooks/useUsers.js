import { useDispatch } from 'react-redux'

import { useNotify } from './useNotify'
import userService from '../services/users'
import { setUsers } from '../reducers/userReducer'

const useUsers = () => {
  const dispatch = useDispatch()
  const notify = useNotify()

  return {
    initializeUsers: async () => {
      try {
        const users = await userService.getAll()
        dispatch(setUsers(users))
      } catch {
        notify("Error: couldn't fetch users")
      }
    },
  }
}

export default useUsers
