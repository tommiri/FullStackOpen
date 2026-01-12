import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'

import { Table } from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs)

  const blogFormRef = useRef()

  if (!blogs) {
    return <div style={{ marginTop: 10 }}>Loading blogs...</div>
  }

  const byLikes = (a, b) => b.likes - a.likes

  const sortedBlogs = [...blogs].sort(byLikes)

  return (
    <>
      <h1 className="mb-3">Blogs</h1>
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <NewBlogForm blogFormRef={blogFormRef}></NewBlogForm>
      </Togglable>
      <Table striped>
        <thead>
          <tr>
            <th>Blog</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {sortedBlogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>{blog.author}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default BlogList
