import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from '../styles/LeftNavigationBar.module.css';
import { getUserInfo, logoutUser } from '../services/users.service';
import { useNavigate } from 'react-router-dom';

const LeftNavigationBar: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState();
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setAccessToken(token);
    }
    const fetchUserInfo = async () => {
      try {
        const user = await getUserInfo();
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo();
  }, []);

  console.log(' grîehgpsrh', user);

  const logout = () => {
    logoutUser();
    setAccessToken(undefined);
    navigate('/');
  };
  return (
    <>
      <Box className={styles.left_sidebar}>
        <Stack>
          <img src="src\assets\Betflow-Logo.svg" alt="betflow-logo" />
        </Stack>
        {user && accessToken ? (
          <Stack display="flex" alignItems="center" spacing={2}>
            <Avatar
              alt="Avatar"
              src={user.avatar}
              sx={{ width: 56, height: 56 }}
            />
            <Stack direction="row" justifyContent="space-between" width="70%">
              <Typography variant="h6">{user.firstname}</Typography>
              <Typography variant="h6">{user.lastname}</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <img
                src="src\assets\betflow.svg"
                alt="betflow logo"
                width="25px"
              />
              <Typography variant="h6">{user.coins} coins</Typography>
            </Stack>
          </Stack>
        ) : (
          <Stack>
            <Typography variant="h6" gutterBottom>
              Account
            </Typography>
            <Button href="/register" variant="outlined">
              Login / Register
            </Button>
          </Stack>
        )}
        <Stack>
          <Typography variant="h6" gutterBottom>
            Navigation
          </Typography>
          <Stack spacing={1}>
            <Button
              href="/"
              variant={location.pathname === '/' ? 'contained' : 'outlined'}
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
              href="/myBets"
              variant={
                location.pathname === '/myBets' ? 'contained' : 'outlined'
              }
              startIcon={
                <img
                  src="src\assets\my-bets-logo.png"
                  alt="dashboard-logo"
                  style={{ marginRight: '32px' }}
                />
              }
            >
              My Bets
            </Button>
            <Button
              href="liveEvents"
              variant={
                location.pathname === '/liveEvents' ? 'contained' : 'outlined'
              }
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
        <Button color="inherit" onClick={logout}>
          <img
            src="src\assets\logout-logo.svg"
            alt="logout"
            style={{ width: '24px' }}
          />
        </Button>
      </Box>
    </>
  );
};

export default LeftNavigationBar;
