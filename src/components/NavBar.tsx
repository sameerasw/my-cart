import React from 'react';
import { AppBar, Toolbar, Typography, TextField, Button, IconButton, Badge, useTheme, Menu, MenuItem, Box, InputAdornment } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { UserState } from '../store/AuthState';
import { useGetCartItemsByCustomerIdQuery } from '../api/cartApiSlice';
import { clearAuth } from '../store/authSlice';
import { RootState } from '../store/types';

interface NavBarProps {
  searchTerm?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  backEnabled?: boolean;
  accountVisible?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({
  searchTerm = '',
  onSearchChange,
  backEnabled = false,
  accountVisible = true
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // redux types
  const { userId: customerId, name, userType } = useSelector((state: RootState) => state.auth);

  const { data: cartData } = useGetCartItemsByCustomerIdQuery(customerId as number, {
    skip: !customerId
  });
  const cartItems = cartData?.cartItems || [];

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(clearAuth());
    handleClose();
    navigate('/');
  };

  const toCart = () => {
    if (!customerId) {
      navigate('/auth/login');
    } else {
      navigate('/cart');
    }
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate total items in cart
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
        boxShadow: '0 4px 20px rgba(37, 99, 235, 0.25)',
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        {backEnabled && (
          <IconButton
            onClick={() => navigate('/')}
            sx={{
              mr: 2,
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' }
            }}
          >
            <ArrowBackIcon sx={{ color: 'white' }} />
          </IconButton>
        )}

        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #ffffff 30%, #e0e7ff 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mr: 4,
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
          My Cart
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {onSearchChange && (
          <TextField
            label="Search products..."
            variant="outlined"
            size='small'
            value={searchTerm}
            onChange={onSearchChange}
            sx={{
              width: { xs: '200px', md: '350px' },
              mr: 3,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'white',
                },
                '&.Mui-focused': {
                  backgroundColor: 'white',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        )}

        {accountVisible && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {name ? (
              <>
                <Button
                  variant="outlined"
                  onClick={handleClick}
                  startIcon={<AccountCircleIcon />}
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                >
                  {name}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    sx: { borderRadius: 2, mt: 1 }
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <Typography variant="body2" color="text.secondary">
                      {userType === 'VENDOR' ? 'Vendor Account' : 'Customer Account'}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/auth/login')}
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    '&:hover': { borderColor: 'rgba(255, 255, 255, 0.5)' }
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate('/auth/register')}
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.15)',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.25)' }
                  }}
                >
                  Register
                </Button>
              </Box>
            )}

            <IconButton
              size="large"
              onClick={toCart}
              sx={{
                ml: 1,
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' }
              }}
            >
              <Badge
                badgeContent={getCartItemCount()}
                color="secondary"
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: '#f59e0b',
                    color: 'white',
                    fontWeight: 600,
                  }
                }}
              >
                <ShoppingCartIcon sx={{ color: 'white' }} />
              </Badge>
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;