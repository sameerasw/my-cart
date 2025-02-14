import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, createTheme, CircularProgress } from '@mui/material';
import HomePage from './pages/HomePage'; 
import CartPage from './pages/CartPage'; 
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './components/NavBar';
import { useState, useEffect } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#339977',
    },
    secondary: {
      main: '#115544',
    },
    background: {
      default: '#ddffee',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        },
      },
    },
  },
});

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <CircularProgress />
          </Box>
        ) : (
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<div>Not Found</div>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </BrowserRouter>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default App;