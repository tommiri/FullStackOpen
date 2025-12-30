import { useState, useEffect, useRef, useMemo } from 'react';

import blogService from './services/blogs';
import loginService from './services/login';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [hasError, setHasError] = useState(false);

  const blogFormRef = useRef();

  const sortedBlogs = useMemo(() => {
    return [...blogs].sort((a, b) => b.likes - a.likes);
  }, [blogs]);

  useEffect(() => {
    const getBlogs = async () => {
      const blogData = await blogService.getAll();
      setBlogs(blogData);
    };
    getBlogs();
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBlogAppUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      setHasError(false);
      blogService.setToken(user.token);
      window.localStorage.setItem('loggedInBlogAppUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setHasError(true);
      setMessage('Error: incorrect credentials');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();

    setUser(null);
    window.localStorage.removeItem('loggedInBlogAppUser');
  };

  const createBlog = async (blogData) => {
    try {
      const newBlog = await blogService.create(blogData);
      blogFormRef.current.toggleVisibility();

      setBlogs([...blogs, { ...newBlog, user: user }]);

      setHasError(false);
      setMessage(`New blog added: "${blogData.title}" by ${blogData.author}`);
      setTimeout(() => setMessage(null), 3000);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setHasError(true);
      setMessage("Error: couldn't create new blogpost");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const updateBlog = async (blogData) => {
    try {
      const response = await blogService.update(blogData);
      const updatedBlog = {
        ...response,
        user: blogData.user,
      };

      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      );
      setHasError(false);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setHasError(true);
      setMessage("Error: couldn't update blogpost");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const deleteBlog = async (blogData) => {
    try {
      await blogService.remove(blogData);
      setBlogs(blogs.filter((b) => b.id !== blogData.id));
      setHasError(false);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setHasError(true);
      setMessage("Error: couldn't delete blogpost");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  return (
    <div>
      {!user && (
        <>
          <h1>Log in to application</h1>
          <Notification error={hasError} message={message} />
          <LoginForm
            onSubmit={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </>
      )}
      {user && (
        <>
          <h2>blogs</h2>
          <Notification error={hasError} message={message} />
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <NewBlogForm createBlog={createBlog}></NewBlogForm>
          </Togglable>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {sortedBlogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
                currentUser={user}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default App;
