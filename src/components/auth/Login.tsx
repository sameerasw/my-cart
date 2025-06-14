import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert, CircularProgress } from '@mui/material';
import { useLoginMutation } from '../../api/sessionApiSlice';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../store/authSlice'
import { UserType } from '../../types/User';

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
        setError('');

        try {
            const data = await login({ email, password, userType }).unwrap();
            console.log('Login successful:', data);

            // Dispatch to Redux store (which will also save to localStorage)
            dispatch(setAuth(data));

            // Navigate based on user type
            if (data.userType === 'VENDOR') {
                navigate('/vendor');
            } else {
                navigate('/');
            }
        } catch (err: any) {
            console.error('Login failed:', err);
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
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
                    onClick={() => navigate('/auth/register')}
                    disabled={loading}
                >
                    Register
                </Button>
            </Box>
            <Box sx={{ mt: 4, backgroundColor: 'background.paper', p: 2, borderRadius: 1 }}>
                <Typography variant="caption" sx={{ color: 'error.main' }}>
                    Warning: This is a demo website. Do not use real email, password, or any sensitive information.
                </Typography>
            </Box>
        </Box>
    );
};

export default Login;
