import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert, Paper, FormControlLabel, Switch, CircularProgress, AppBar, Toolbar, useTheme, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRegisterMutation } from '../api/sessionApiSlice';
import { UserType } from '../types/User';

interface RegisterProps {
  onRegisterSuccess: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegisterSuccess }) => {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserType>('CUSTOMER');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await register({ name, email, password, userType }).unwrap();
      onRegisterSuccess();
      navigate('/login');
    } catch (err: any) {
      if (err.status === 409) {
        setError('Email already exists');
      } else {
        setError('Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUserTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(event.target.checked ? 'VENDOR' : 'CUSTOMER');
  };

  return (
    <Paper>
    <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
      <Toolbar>
      <IconButton onClick={() => navigate('/')}>
        <ArrowBackIcon sx={{ color: 'white' }} />
      </IconButton>
        <Typography variant="h5" sx={{ ml: 2, flexGrow: 1 }}>
          My Cart App
        </Typography>
      </Toolbar>
    </AppBar>
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
          Register for My Cart
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
            {loading ? <CircularProgress size={24} /> : 'Register'}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate('/login')}
            disabled={loading}
          >
            Login
          </Button>
        </Box>
        {/* warning on demo website */}
        <Box sx={{ mt: 4, backgroundColor: 'background.default', p: 2, borderRadius: 1 }}>
          <Typography variant="caption" sx={{ color: 'error.main' }}>
            Warning: This is a demo website. Do not use real email, password, or any sensitive information.
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default Register;