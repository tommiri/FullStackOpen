import { useState } from 'react';

const Blog = ({ blog, updateBlog, deleteBlog, currentUser }) => {
  const [expanded, setExpanded] = useState(false);

  const hideWhenExpanded = { display: expanded ? 'none' : '' };
  const showWhenExpanded = { display: expanded ? '' : 'none' };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 4,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    updateBlog(likedBlog);
  };

  const handleDelete = (e) => {
    e.preventDefault();

    const isConfirmed = window.confirm(
      `Do you want to delete ${blog.title} by ${blog.author}?`
    );
    if (isConfirmed) {
      deleteBlog(blog);
    } else {
      return;
    }
  };

  return (
    <li style={blogStyle}>
      <button onClick={toggleExpanded}>{expanded ? 'hide' : 'show'}</button>
      <div style={hideWhenExpanded}>
        {blog.title} by {blog.author}
      </div>
      <div style={showWhenExpanded}>
        <div>Title: {blog.title}</div>
        <div>Author: {blog.author}</div>
        <div>
          URL: <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          Likes: {blog.likes}
          <button onClick={handleUpdate}>like</button>
        </div>
        <div>User: {blog.user ? blog.user.name : 'None'}</div>
        {currentUser && blog.user
          ? currentUser.name === blog.user.name && (
              <button onClick={handleDelete} style={{ marginTop: 10 }}>
                delete
              </button>
            )
          : ''}
      </div>
    </li>
  );
};

export default Blog;
