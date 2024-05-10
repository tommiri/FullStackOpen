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
        Username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">LOGIN</button>
    </form>
  );
};

export default LoginForm;
