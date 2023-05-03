type NotificationProps = {
  message: string;
  error: boolean;
};

const Notification = ({ message, error }: NotificationProps) => {
  if (!message) {
    return null;
  }

  const style = {
    color: error ? 'red' : 'green',
    marginBottom: 10,
  };

  return <div style={style}>{message}</div>;
};

export default Notification;
