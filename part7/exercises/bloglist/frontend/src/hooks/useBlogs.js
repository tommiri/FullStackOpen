import { useDispatch, useSelector } from 'react-redux'

import { useNotify } from './useNotify'
import {
  setBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../reducers/blogReducer'
import blogService from '../services/blogs'

export const useBlogs = () => {
  const dispatch = useDispatch()
  const notify = useNotify()
  const user = useSelector(({ user }) => user)

  return {
    initializeBlogs: async () => {
      try {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
      } catch {
        notify("Error: couldn't fetch blogs")
      }
    },
    appendBlog: async (blogData) => {
      try {
        const newBlog = await blogService.create(blogData)
        dispatch(createBlog({ ...newBlog, user: user }))
        notify(`New blog added: "${blogData.title}" by ${blogData.author}`)
      } catch {
        notify("Error: couldn't create new blogpost", { isError: true })
      }
    },
    reviseBlog: async (blogData) => {
      try {
        const response = await blogService.update(blogData)
        const updatedBlog = {
          ...response,
          user: blogData.user,
        }

        dispatch(updateBlog(updatedBlog))
      } catch {
        notify("Error: couldn't update blog", { isError: true })
      }
    },
    removeBlog: async (blogData) => {
      try {
        await blogService.remove(blogData)
        dispatch(deleteBlog(blogData))
        notify(`Successfully deleted "${blogData.title}"`)
      } catch {
        notify("Error: couldn't delete blogpost", { isError: true })
      }
    },
  }
}
