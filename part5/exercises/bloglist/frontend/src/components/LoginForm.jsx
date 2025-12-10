const LoginForm = ({
  onSubmit,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">LOGIN</button>
    </form>
  );
};

export default LoginForm;
