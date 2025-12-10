import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    getBlogs();
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInBlogAppUser");
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

      blogService.setToken(user.token);

      window.localStorage.setItem("loggedInBlogAppUser", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setHasError(true);
      setMessage("Incorrect credentials");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();

    setUser(null);
    window.localStorage.removeItem("loggedInBlogAppUser");
  };

  const createBlogpost = async (blogData) => {
    try {
      const response = await blogService.create(blogData);
      if (response) {
        setBlogs(blogs.concat(response));
        setHasError(false);
        setMessage(`New blog added: "${blogData.title}" by ${blogData.author}`);
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (error) {
      setHasError(true);
      setMessage("Failed to create blogpost");
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
          <NewBlogForm onSubmit={createBlogpost}></NewBlogForm>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
