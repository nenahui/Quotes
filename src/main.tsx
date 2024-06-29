import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './index.css';
import { SnackbarProvider } from 'notistack';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme
      appearance={'dark'}
      hasBackground={false}
      panelBackground={'translucent'}
    >
      <BrowserRouter>
        <SnackbarProvider />
        <App />
      </BrowserRouter>
    </Theme>
  </React.StrictMode>
);
