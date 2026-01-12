import { useSelector } from 'react-redux'

import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)

  if (!notification) return null

  const { message, isError } = notification

  return <Alert variant={isError ? 'danger' : 'success'}>{message}</Alert>
}

export default Notification
