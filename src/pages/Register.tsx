import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { registerUser } from '../services/users.service';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      registerUser(formData);
      navigate('/login');
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
        <Typography variant="h3">Register</Typography>
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
              <FormLabel>Firstname</FormLabel>
              <TextField
                color="primary"
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
                sx={{ marginBottom: '10px' }}
              />
            </Stack>
            <Stack>
              <FormLabel>Lastname</FormLabel>
              <TextField
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
                sx={{ marginBottom: '10px' }}
              />
            </Stack>
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
              Register
            </Button>
          </FormControl>
        </form>
        <Typography variant="caption">
          Already have an account? <Link href="/login">Go to Login</Link>
        </Typography>
      </Stack>
    </>
  );
};

export default Register;
