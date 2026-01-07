import { useState } from 'react'

import { useBlogs } from '../hooks/useBlogs'

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
    <form onSubmit={addBlog}>
      <div>
        <label>
          title:
          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          author:
          <input
            type="text"
            value={author}
            placeholder="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          url:
          <input
            type="text"
            value={url}
            placeholder="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default NewBlogForm
