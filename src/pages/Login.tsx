import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Typography,
  Link,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/users.service';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../contexts/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  password: z.string().min(3, 'Password must be at least 3 characters long'),
});
type FormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const theme = useTheme();
  const isLgScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { login, refreshUser } = useAuth();
  const navigate = useNavigate();

  const defaultValues = {
    email: '',
    password: '',
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const token = await loginUser(data);
    if (token) {
      login(token);
      refreshUser();
      reset();
      navigate('/');
    }
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
          <Typography variant={isSmScreen ? 'h4' : 'h3'}>Login</Typography>
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
                <FormLabel>Email</FormLabel>
                <TextField
                  type="email"
                  {...register('email')}
                  defaultValue={defaultValues.email}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{ marginBottom: '10px' }}
                />
              </Stack>
              <Stack>
                <FormLabel>Password</FormLabel>
                <TextField
                  type="password"
                  {...register('password')}
                  defaultValue={defaultValues.password}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{ marginBottom: '10px' }}
                />
              </Stack>
              <Button type="submit" variant="contained">
                Login
              </Button>
            </FormControl>
          </form>
          <Typography variant="caption">
            You don't have an account yet ?{' '}
            <Link href="/register">Go to Register</Link>
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default Login;
