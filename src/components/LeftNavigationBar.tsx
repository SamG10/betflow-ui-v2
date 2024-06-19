import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useState } from 'react';
import styles from '../styles/LeftNavigationBar.module.css';
import { useTheme, Theme } from '@mui/material/styles';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useAuth } from '../contexts/AuthContext';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { editUserProfile } from '../services/users.service';
import useFormWithErrorHandling from '../hooks/FormErrorHandling';

const LeftNavigationBar: React.FC = () => {
  const theme: Theme = useTheme();
  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'));

  const { isAuthenticated, user, logout, refreshUser } = useAuth();

  const { handleFormError } = useFormWithErrorHandling();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    avatar: '',
  });

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (user && user._id) {
        await editUserProfile(user._id, formData);
        refreshUser();
        setFormData({
          firstname: '',
          lastname: '',
          avatar: '',
        });
      }
      handleModalClose();
    } catch (error) {
      handleFormError(error);
    }
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
              <Typography variant="h5" fontWeight="bold" gutterBottom mr={1}>
                Profile
              </Typography>
              <IconButton onClick={() => handleModalOpen()}>
                <ModeEditIcon fontSize="small" color="info" />
              </IconButton>
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
            <Button href="/login" variant="outlined">
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
                <img
                  style={{
                    width: '24px',
                    marginRight: '10px',
                    marginLeft: '28px',
                  }}
                  src="src/assets/dashboard-logo.png"
                  alt="dashboard-logo"
                />
              }
              sx={{ justifyContent: 'flex-start', textAlign: 'left' }}
            >
              Dashboard
            </Button>
            {isAuthenticated && (
              <Button
                href="/myBets"
                variant={
                  location.pathname === '/myBets' ? 'contained' : 'outlined'
                }
                startIcon={
                  <img
                    style={{
                      width: '24px',
                      marginRight: '10px',
                      marginLeft: '28px',
                    }}
                    src="src/assets/my-bets-logo.png"
                    alt="my-bets-logo"
                  />
                }
                sx={{ justifyContent: 'flex-start', textAlign: 'left' }}
              >
                My Bets
              </Button>
            )}
            <Button
              href="liveEvents"
              variant={
                location.pathname === '/liveEvents' ? 'contained' : 'outlined'
              }
              startIcon={
                <img
                  style={{
                    width: '24px',
                    marginRight: '10px',
                    marginLeft: '28px',
                  }}
                  src="src/assets/live-logo.png"
                  alt="live-logo"
                />
              }
              sx={{ justifyContent: 'flex-start', textAlign: 'left' }}
            >
              Live Events
            </Button>
            <Button
              href="/standings"
              variant={
                location.pathname === '/standings' ? 'contained' : 'outlined'
              }
              startIcon={
                <img
                  style={{
                    width: '24px',
                    marginRight: '10px',
                    marginLeft: '28px',
                  }}
                  src="src/assets/standings.png"
                  alt="standings-logo"
                />
              }
              sx={{ justifyContent: 'flex-start', textAlign: 'left' }}
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
                  style={{
                    width: '24px',
                    marginRight: '10px',
                    marginLeft: '28px',
                  }}
                  src="src/assets/ranking-users.png"
                  alt="ranking-users-logo"
                />
              }
              sx={{ justifyContent: 'flex-start', textAlign: 'left' }}
            >
              Ranking Users
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Button color="inherit" onClick={logout}>
        <img
          style={{
            width: '24px',
            marginRight: '10px',
            marginLeft: '28px',
          }}
          src="src/assets/logout-logo.svg"
          alt="logout"
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
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isXsDown ? '90%' : 300,
            maxWidth: '90%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '10px',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Profile
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="First Name"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Last Name"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Avatar URL"
              name="avatar"
              value={formData.avatar}
              onChange={handleInputChange}
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default LeftNavigationBar;
