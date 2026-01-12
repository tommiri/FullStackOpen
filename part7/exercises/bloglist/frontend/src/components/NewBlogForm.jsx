import { useState } from 'react'

import useBlogs from '../hooks/useBlogs'

import { Button, Form, FloatingLabel, Row, Col } from 'react-bootstrap'

const NewBlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const { appendBlog } = useBlogs()

  const addBlog = async (e) => {
    e.preventDefault()
    await appendBlog({ title, author, url })
    blogFormRef.current.toggleVisibility()

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Form onSubmit={addBlog}>
      <Row>
        <Col sm={3}>
          <FloatingLabel label="Title" className="mb-2">
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </FloatingLabel>
        </Col>
        <Col sm={3}>
          <FloatingLabel label="Author" className="mb-2">
            <Form.Control
              type="text"
              name="author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <FloatingLabel label="URL" className="mb-2">
            <Form.Control
              type="text"
              name="url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="outline-success" className="mb-2" type="submit">
            Create
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default NewBlogForm
