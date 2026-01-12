import { useDispatch, useSelector } from 'react-redux'

import { useNotify } from './useNotify'
import useUsers from './useUsers'
import {
  setBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../reducers/blogReducer'
import blogService from '../services/blogs'

const useBlogs = () => {
  const dispatch = useDispatch()
  const notify = useNotify()
  const { initializeUsers } = useUsers()
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
        await initializeUsers()
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
        await initializeUsers()
        notify(`Successfully deleted "${blogData.title}"`)
      } catch {
        notify("Error: couldn't delete blogpost", { isError: true })
      }
    },
    commentBlog: async (blog, content) => {
      try {
        const updatedBlog = await blogService.comment(blog.id, { content })
        dispatch(updateBlog({ ...updatedBlog, user: blog.user }))
      } catch {
        notify("Error: couldn't post comment", { isError: true })
      }
    },
  }
}

export default useBlogs
