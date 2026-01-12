import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ListGroup, Alert } from 'react-bootstrap'

const User = () => {
  const { id } = useParams()
  const user = useSelector(({ users }) => users.find((u) => u.id === id))

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <>
      <h2 className="mb-3">{user.name}</h2>
      <hr />
      <h3 className="mb-3">Added blogs</h3>
      {user.blogs.length > 0 ? (
        <>
          <ListGroup variant="flush">
            {user.blogs.map((blog) => (
              <ListGroup.Item key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by{' '}
                {blog.author}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      ) : (
        <Alert variant="warning">No blogs added yet!</Alert>
      )}
    </>
  )
}

export default User
