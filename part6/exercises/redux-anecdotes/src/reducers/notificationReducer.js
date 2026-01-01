import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(_state, action) {
      return action.payload
    },
    clearMessage() {
      return initialState
    },
  },
})

export const { setMessage, clearMessage } = notificationSlice.actions
export default notificationSlice.reducer
