import React from 'react';
import { useError } from '../contexts/ErrorContext';
import { Alert, Snackbar } from '@mui/material';

const ErrorSnackbar: React.FC = () => {
  const { error, clearError } = useError();

  return (
    <>
      <Snackbar open={!!error} autoHideDuration={3000} onClose={clearError}>
        <Alert
          variant="outlined"
          sx={{ bgcolor: '#1C1C24', color: 'white' }}
          onClose={clearError}
          severity="error"
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ErrorSnackbar;
