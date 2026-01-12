import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(_state, action) {
      return action.payload
    },
    clearUser() {
      return null
    },
  },
})

export const { setUser, clearUser } = authSlice.actions

export default authSlice.reducer
