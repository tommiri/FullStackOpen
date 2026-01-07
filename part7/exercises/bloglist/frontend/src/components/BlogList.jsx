import { useSelector } from 'react-redux'

import { useBlogs } from '../hooks/useBlogs'

import Blog from './Blog'

const listStyle = {
  listStyleType: 'none',
  padding: 0,
}

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const user = useSelector(({ user }) => user)

  const { reviseBlog, removeBlog } = useBlogs()

  if (!blogs) {
    return <div style={{ marginTop: 10 }}>Loading blogs...</div>
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const handleLike = async (blog) => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    await reviseBlog(likedBlog)
  }

  const handleDelete = async (blog) => {
    const isConfirmed = window.confirm(
      `Do you want to delete ${blog.title} by ${blog.author}?`
    )
    if (isConfirmed) {
      await removeBlog(blog)
    } else {
      return
    }
  }

  return (
    <ul style={listStyle}>
      {sortedBlogs.map((blog) => {
        return (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleLike={() => handleLike(blog)}
            handleDelete={() => handleDelete(blog)}
          />
        )
      })}
    </ul>
  )
}

export default BlogList
