import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface WelcomeProps {
  name: string;
}

const Welcome = (props: WelcomeProps) => {
  return <h1>Hello, {props.name}</h1>;
};

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <Welcome name="Tommi" />
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);
