const Button = ({ handler, text }) => {
  return (
    <button style={{ marginLeft: 5 }} onClick={handler}>
      {text}
    </button>
  );
};

export default Button;
