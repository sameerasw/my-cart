import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert, Paper, CircularProgress } from '@mui/material';
import { useLoginMutation } from '../api/sessionApiSlice';
import { useDispatch } from 'react-redux';
import { setAuth } from '../store/authSlice'
import { UserType } from '../types/User';
import NavBar from '../components/NavBar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType] = useState<UserType>('CUSTOMER');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const data = await login({ email, password, userType }).unwrap();
      console.log(data);
      dispatch(setAuth(data));
      console.log("successful saving data");
      if (data.userType === 'VENDOR') {
        navigate('/vendor');
      } else {
        navigate('/');
      }
      console.log("successful navigate");
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper>
    <NavBar accountVisible={false} backEnabled={true} />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        maxWidth: '400px',
        margin: 'auto',
      }}>
        <Typography component="h1" variant="h5">
          Login to My Cart
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate('/register')}
            disabled={loading}
          >
            Register
          </Button>
        </Box>
        {/* warning on demo website */}
        <Box sx={{ mt: 4, backgroundColor: 'background.paper', p: 2, borderRadius: 1 }}>
          <Typography variant="caption" sx={{ color: 'error.main' }}>
            Warning: This is a demo website. Do not use real email, password, or any sensitive information.
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default Login;