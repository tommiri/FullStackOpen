import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
  const { notification } = useContext(NotificationContext)

  if (!notification) return null

  const { message, isError } = notification

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 2,
    marginBottom: 5,
    borderColor: isError ? 'red' : 'green',
  }

  return <div style={style}>{message}</div>
}

export default Notification
