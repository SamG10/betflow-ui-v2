import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/users.service';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await loginUser(formData);
      navigate('/');
    } catch (error) {
      console.log('error');
    }
  };
  return (
    <>
      <Stack
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        spacing={5}
        padding="10px"
        bgcolor="#1C1C24"
        borderRadius="20px"
        width="250px"
      >
        <Typography variant="h3">Login</Typography>
        <form onSubmit={handleSubmit}>
          <FormControl
            fullWidth
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Stack>
              <FormLabel>Email</FormLabel>
              <TextField
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{ marginBottom: '10px' }}
              />
            </Stack>
            <Stack>
              <FormLabel>Password</FormLabel>
              <TextField
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                sx={{ marginBottom: '10px' }}
              />
            </Stack>
            <Button type="submit" variant="contained">
              Login
            </Button>
          </FormControl>
        </form>
      </Stack>
    </>
  );
};

export default Login;
