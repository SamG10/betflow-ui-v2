import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import styles from '../styles/LeftNavigationBar.module.css';

const LeftNavigationBar: React.FC = () => {
  return (
    <>
      <div className={styles.leftNavigationBarContainer}>
        <Stack>
          <img src="src\assets\Betflow-Logo.svg" alt="betflow-logo" />
        </Stack>
        <Stack>
          <div
            style={{
              display: 'flex',
              justifyContent: 'start',
              marginBottom: '8px',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Navigation
            </Typography>
          </div>
          <Stack spacing={1}>
            <Button
              href="/"
              variant="contained"
              startIcon={
                <img
                  src="src\assets\dashboard-logo.png"
                  alt="dashboard-logo"
                  style={{ marginRight: '10px' }}
                />
              }
            >
              Dashboard
            </Button>
            <Button
              href="#"
              variant="contained"
              startIcon={
                <img
                  src="src\assets\my-bets-logo.png"
                  alt="dashboard-logo"
                  style={{ marginRight: '10px' }}
                />
              }
            >
              My Bets
            </Button>
            <Button
              href="#"
              variant="contained"
              startIcon={
                <img
                  src="src\assets\live-logo.png"
                  alt="dashboard-logo"
                  style={{ marginRight: '10px' }}
                />
              }
            >
              Live Events
            </Button>
          </Stack>
        </Stack>
        <Stack
          style={{
            display: 'flex',
            alignItems: 'end',
          }}
        >
          <Button color="inherit">
            <img
              src="src\assets\logout-logo.svg"
              alt="logout"
              style={{ width: '24px' }}
            />
          </Button>
        </Stack>
      </div>
    </>
  );
};

export default LeftNavigationBar;
