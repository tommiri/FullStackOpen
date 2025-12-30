import { useState } from 'react';

const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (e) => {
    e.preventDefault();
    createBlog({ title, author, url });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

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
  );
};

export default NewBlogForm;
