import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      console.log(action.payload)
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      const updatedBlogs = state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
      return updatedBlogs
    },
    deleteBlog(state, action) {
      const blogToDelete = action.payload
      const updatedBlogs = state.filter((blog) => blog.id !== blogToDelete.id)
      return updatedBlogs
    },
    setBlogs(_state, action) {
      return action.payload
    },
  },
})

export const { createBlog, updateBlog, setBlogs, deleteBlog } =
  blogSlice.actions

export default blogSlice.reducer
