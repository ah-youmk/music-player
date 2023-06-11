import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Toaster } from './components/ui/Toaster';
import './index.css';

document.body.className =
  'dark:text-white dark:bg-gradient-to-t dark:from-[#121212] dark:to-[#222]';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <App />
    <Toaster />
  </>
);
