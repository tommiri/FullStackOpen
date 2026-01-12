import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import useBlogs from '../hooks/useBlogs'

import { Card, Button, ListGroup, Form, Row, Col, Alert } from 'react-bootstrap'

const Blog = ({ user }) => {
  const [comment, setComment] = useState('')
  const { id } = useParams()
  const blog = useSelector(({ blogs }) => blogs.find((b) => b.id === id))

  const navigate = useNavigate()
  const { reviseBlog, removeBlog, commentBlog } = useBlogs()

  if (!blog) {
    return <div>loading blog...</div>
  }

  const handleLike = async () => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }

    await reviseBlog(likedBlog)
  }

  const handleComment = async () => {
    await commentBlog(blog, comment)
    setComment('')
  }

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      `Do you want to delete ${blog.title} by ${blog.author}?`
    )
    if (isConfirmed) {
      await removeBlog(blog)
      navigate('/')
    } else {
      return
    }
  }

  return (
    <>
      <Card style={{ width: '18rem' }} className="mb-3">
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            by {blog.author}
          </Card.Subtitle>
          <ListGroup variant="flush" className="mb-2">
            <ListGroup.Item>
              <Card.Link href={blog.url} className="mb-4">
                Link to blogpost
              </Card.Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Card.Text className="d-flex justify-content-between align-items-center">
                Likes: {blog.likes}
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleLike()}
                >
                  Like
                </Button>
              </Card.Text>
            </ListGroup.Item>
            <ListGroup.Item>
              {blog.user && (
                <div>
                  Added by{' '}
                  <Link to={`/users/${blog.user.id}`}> {blog.user.name}</Link>
                </div>
              )}
            </ListGroup.Item>
          </ListGroup>

          {user && blog.user
            ? user.name === blog.user.name && (
                <Button variant="outline-danger" onClick={() => handleDelete()}>
                  Delete blog
                </Button>
              )
            : ''}
        </Card.Body>
      </Card>

      <h3 className="mb-3">Comments</h3>

      <Form className="mb-3">
        <Row className="mb-2">
          <Col sm={5}>
            <Form.Control
              type="text"
              name="comment"
              placeholder="Write your comment here..."
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
          </Col>
        </Row>
        <Button variant="outline-primary" onClick={handleComment}>
          Add comment
        </Button>
      </Form>

      {blog.comments.length <= 0 ? (
        <Alert variant="primary">No comments yet</Alert>
      ) : (
        <ListGroup>
          {blog.comments.map((comment, i) => (
            <ListGroup.Item key={i}>{comment}</ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  )
}

export default Blog
