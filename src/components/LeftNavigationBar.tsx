import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import styles from '../styles/LeftNavigationBar.module.css';
import { useTheme, Theme } from '@mui/material/styles';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useAuth } from '../contexts/AuthContext';

const LeftNavigationBar: React.FC = () => {
  const theme: Theme = useTheme();
  const { isAuthenticated, user, logout } = useAuth();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const sidebarContent = (
    <Box className={styles.left_sidebar}>
      <Stack direction="column">
        <Stack spacing={2}>
          <img src="src/assets/Betflow-Logo.svg" alt="betflow-logo" />
          <Divider color="#404040" sx={{ borderBottomWidth: 2 }} />
        </Stack>
        {isAuthenticated && user ? (
          <Stack direction="column" spacing={2} paddingTop={2}>
            <Stack direction="row">
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Profile
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                alt="Avatar"
                src={user.avatar}
                sx={{ width: 78, height: 78 }}
              />
              <Stack direction="column">
                <Typography variant="h5" fontWeight="bold">
                  {user.firstname}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    color={theme.palette.primary.main}
                  >
                    {user.coins?.toFixed(2)}
                  </Typography>
                  <img
                    src="src/assets/betflow.svg"
                    alt="betflow logo"
                    width="32px"
                  />
                </Stack>
              </Stack>
            </Stack>
            <Stack direction="row"></Stack>
            <Divider color="#404040" sx={{ borderBottomWidth: 2 }} />
          </Stack>
        ) : (
          <Stack paddingTop={2}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Account
            </Typography>
            <Button href="/register" variant="outlined">
              Login / Register
            </Button>
          </Stack>
        )}
        <Stack paddingTop={2} spacing={2}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Navigation
          </Typography>
          <Stack spacing={1}>
            <Button
              href="/"
              variant={location.pathname === '/' ? 'contained' : 'outlined'}
              startIcon={
                <img src="src/assets/dashboard-logo.png" alt="dashboard-logo" />
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
                <img src="src/assets/my-bets-logo.png" alt="my-bets-logo" />
              }
            >
              My Bets
            </Button>
            <Button
              href="liveEvents"
              variant={
                location.pathname === '/liveEvents' ? 'contained' : 'outlined'
              }
              startIcon={<img src="src/assets/live-logo.png" alt="live-logo" />}
            >
              Live Events
            </Button>
            <Button
              href="/standings"
              variant={
                location.pathname === '/standings' ? 'contained' : 'outlined'
              }
              startIcon={
                <img src="src/assets/standings.png" alt="standings-logo" />
              }
            >
              Standings
            </Button>
            <Button
              href="/rankingUsers"
              variant={
                location.pathname === '/rankingUsers' ? 'contained' : 'outlined'
              }
              startIcon={
                <img
                  src="src/assets/ranking-users.png"
                  alt="ranking-users-logo"
                />
              }
            >
              Ranking Users
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Button color="inherit" onClick={logout}>
        <img
          src="src/assets/logout-logo.svg"
          alt="logout"
          style={{ width: '24px' }}
        />
      </Button>
    </Box>
  );

  return (
    <>
      <Hidden lgDown>{sidebarContent}</Hidden>
      <Hidden lgUp>
        <IconButton onClick={toggleDrawer(true)}>
          <KeyboardDoubleArrowRightIcon sx={{ color: '#4F5051' }} />
        </IconButton>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          {sidebarContent}
        </Drawer>
      </Hidden>
    </>
  );
};

export default LeftNavigationBar;
