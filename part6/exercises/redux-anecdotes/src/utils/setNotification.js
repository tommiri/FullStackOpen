import { setMessage, clearMessage } from '../reducers/notificationReducer'

let timeoutId

const notify =
  (message, timeout = 5000) =>
  (dispatch) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    dispatch(setMessage(message))
    timeoutId = setTimeout(() => {
      dispatch(clearMessage())
    }, timeout)
  }

export default notify
