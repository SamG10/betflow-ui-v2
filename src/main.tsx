import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { ErrorProvider } from './contexts/ErrorContext.tsx';
import ErrorSnackbar from './components/ErrorSnackbar.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorProvider>
      <AuthProvider>
        <App />
        <ErrorSnackbar />
      </AuthProvider>
    </ErrorProvider>
  </React.StrictMode>
);
