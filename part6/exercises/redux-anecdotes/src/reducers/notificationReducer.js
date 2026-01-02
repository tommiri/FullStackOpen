import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(_state, action) {
      return action.payload
    },
  },
})

const { setMessage } = notificationSlice.actions

let timeoutId

export const notify =
  (
    message,
    duration = 5 // Default duration of 5 seconds if not specified
  ) =>
  (dispatch) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    const delay = duration * 1000

    dispatch(setMessage(message))
    timeoutId = setTimeout(() => {
      dispatch(setMessage(initialState))
    }, delay)
  }

export default notificationSlice.reducer
