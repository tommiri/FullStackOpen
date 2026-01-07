import { useDispatch } from 'react-redux'
import { setMessage, clearMessage } from '../reducers/notificationReducer'

let timeoutId

export const useNotify = () => {
  const dispatch = useDispatch()

  return (message, { duration = 5, isError = false } = {}) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    const delay = duration * 1000

    dispatch(setMessage({ message: message, isError: isError }))
    timeoutId = setTimeout(() => {
      dispatch(clearMessage())
    }, delay)
  }
}
