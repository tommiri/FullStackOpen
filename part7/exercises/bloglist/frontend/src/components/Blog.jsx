const blogStyle = {
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 4,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  return (
    <li style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
      </div>
      <div>
        <div>Title: {blog.title}</div>
        <div>Author: {blog.author}</div>
        <div>
          URL: <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          Likes: {blog.likes}
          <button onClick={handleLike}>like</button>
        </div>
        <div>User: {blog.user ? blog.user.name : 'Unknown'}</div>
        {user && blog.user
          ? user.name === blog.user.name && (
              <button onClick={handleDelete} style={{ marginTop: 10 }}>
                delete
              </button>
            )
          : ''}
      </div>
    </li>
  )
}

export default Blog
