type Props = {
  errorMessage: string;
};

const errorStyle = {
  color: 'red',
  marginBottom: '1em',
};

const Notify = ({ errorMessage }: Props) => {
  if (!errorMessage) {
    return null;
  }

  return <div style={errorStyle}>{errorMessage}</div>;
};

export default Notify;
