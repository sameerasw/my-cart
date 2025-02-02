import React from 'react';
import { AppBar, Toolbar, Typography, TextField, Button, IconButton, Badge, useTheme } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserState } from '../store/AuthState';
import { useGetCartItemsByCustomerIdQuery } from '../api/cartApiSlice';

interface NavBarProps {
  searchTerm?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  backEnabled?: boolean;
  accountVisible?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ searchTerm, onSearchChange, backEnabled = false, accountVisible = true }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { userId: customerId, name } = useSelector((state: { auth: UserState }) => state.auth);
  const { data: cartItems = [] } = useGetCartItemsByCustomerIdQuery(customerId as number, { skip: !customerId });

  const toCart = () => {
    if (!customerId) {
      navigate('/login');
    } else {
      navigate('/cart');
    }
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, boxShadow: 'none'}}>
      <Toolbar>
        {backEnabled && (
          <IconButton onClick={() => navigate('/')}>
            <ArrowBackIcon sx={{ color: 'white' }} />
          </IconButton>
        )}
        <Typography variant="h5" sx={{ ml: 2, flexGrow: 1 }}>
          My Cart App
        </Typography>
        {onSearchChange && (
          <TextField
            fullWidth
            label="Search"
            variant="outlined"
            size='small'
            value={searchTerm}
            onChange={onSearchChange}
            sx={{ 
              width: '300px', 
              marginLeft: 'auto', 
              marginRight: '10px',
              backgroundColor: 'white',
              borderRadius: '10px'
            }}
          />
        )}
        {accountVisible && (
          <>
            {name ? (
              <Button variant="contained" onClick={() => navigate('/login')}>
                {name}
              </Button>
            ) : (
              <>
                <Button variant="contained" onClick={() => navigate('/login')} sx={{ marginRight: 1 }}>
                  Login
                </Button>
                <Button variant="contained" onClick={() => navigate('/register')}>
                  Register
                </Button>
              </>
            )}
            <IconButton size="large" color="inherit" onClick={toCart}>
              <Badge badgeContent={cartItems.reduce((total, item) => total + item.quantity, 0)} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;