import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

let timeoutId

export const useNotify = () => {
  const { notificationDispatch } = useContext(NotificationContext)

  return (message, { duration = 5, isError = false } = {}) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    const delay = duration * 1000

    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: { message, isError },
    })
    timeoutId = setTimeout(() => {
      notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
    }, delay)
  }
}
