import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

document.body.className =
  'dark:text-white dark:bg-gradient-to-t dark:from-[#111] dark:to-[#1F1F1F]';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
