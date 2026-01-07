import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setMessage(_state, action) {
      return action.payload
    },
    clearMessage() {
      return null
    },
  },
})

export const { setMessage, clearMessage } = notificationSlice.actions
export default notificationSlice.reducer
