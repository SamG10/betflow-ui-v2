import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { registerUser } from '../services/users.service';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const registerSchema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  password: z.string().min(3, 'Password must be at least 3 characters long'),
  firstname: z.string().min(1, 'Firstname is required'),
  lastname: z.string().min(1, 'Lastname is required'),
  avatar: z.string().optional(),
});
type FormData = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const theme = useTheme();
  const isLgScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const defaultValues = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    avatar: '',
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    registerUser(data);
    reset();
    navigate('/login');
  };

  return (
    <>
      <Stack
        width={isLgScreen ? 'calc(100vw - 250px)' : '100vw'}
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          spacing={5}
          padding="10px"
          bgcolor="#1C1C24"
          borderRadius="20px"
          width={{ xs: '300px', sm: '400px', md: '400px', lg: '280px' }}
        >
          <Typography variant={isSmScreen ? 'h4' : 'h3'}>Register</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  {...register('firstname')}
                  defaultValue={defaultValues.firstname}
                  error={!!errors.firstname}
                  helperText={errors.firstname?.message}
                  sx={{ marginBottom: '10px', width: '246px' }}
                />
              </Stack>
              <Stack>
                <FormLabel>Lastname</FormLabel>
                <TextField
                  type="text"
                  {...register('lastname')}
                  defaultValue={defaultValues.lastname}
                  error={!!errors.lastname}
                  helperText={errors.lastname?.message}
                  sx={{ marginBottom: '10px', width: '246px' }}
                />
              </Stack>
              <Stack>
                <FormLabel>Avatar</FormLabel>
                <TextField
                  type="text"
                  {...register('avatar')}
                  defaultValue={defaultValues.avatar}
                  error={!!errors.avatar}
                  helperText={
                    errors.avatar?.message
                      ? errors.avatar?.message
                      : '(Optional) or put an image url'
                  }
                  sx={{ marginBottom: '10px', width: '246px' }}
                />
              </Stack>
              <Stack>
                <FormLabel>Email</FormLabel>
                <TextField
                  type="email"
                  {...register('email')}
                  defaultValue={defaultValues.email}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{ marginBottom: '10px', width: '246px' }}
                />
              </Stack>
              <Stack>
                <FormLabel>Password</FormLabel>
                <TextField
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  defaultValue={defaultValues.password}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{ marginBottom: '10px' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          sx={{ color: 'white' }}
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <Button type="submit" variant="contained">
                Register
              </Button>
            </FormControl>
          </form>
          <Typography variant="caption">
            You already have an account ? <Link href="/login">Go to Login</Link>
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default Register;
