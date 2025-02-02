import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CartView from '../components/CartView';
import { Container,
  Typography, 
  Button, 
  Grid,
  IconButton, 
  AppBar, 
  Toolbar, 
  useTheme, 
  Box, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useGetCartItemsByCustomerIdQuery, useRemoveCartItemMutation, useClearCartMutation } from '../api/cartApiSlice';
import { UserState } from '../store/AuthState';

const CartPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { userId: customerId } = useSelector((state: { auth: UserState }) => state.auth);

  const { data: cartItems = [], isLoading, error, refetch } = useGetCartItemsByCustomerIdQuery(customerId as number, { skip: !customerId });
  const [removeCartItem] = useRemoveCartItemMutation();
  const [clearCart] = useClearCartMutation();
  const [openDialog, setOpenDialog] = useState(false);

  const handleRemoveFromCart = async (cartItemId: number) => {
    try {
      await removeCartItem(cartItemId).unwrap();
      refetch(); // Reload the cart items list
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart(customerId as number).unwrap();
      refetch(); // Reload the cart items list
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      await clearCart(customerId as number).unwrap();
      setOpenDialog(true);
      refetch(); // Reload the cart items list
    } catch (error) {
      console.error('Failed to complete purchase:', error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    if (!customerId) {
      navigate('/login');
    } else {
      refetch();
    }
  }, [customerId, cartItems]);

  const handleBackToHome = () => {
    navigate('/');
  };
  
  return (
    <Container maxWidth="lg" sx={{ padding: 2, mt: 2 }}>

      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ alignItems: 'center', alignContent: 'center' }}>
          <IconButton onClick={handleBackToHome}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" align="center" sx={{ ml: 2 }}>
            Shopping Cart
          </Typography>
        </Toolbar>
      </AppBar>

      {cartItems.length === 0 ? (
        <Typography variant="body1" align="center" mt={2} sx={{ mt: 6 }}>
          Your cart is empty.
        </Typography>
      ) : (
          <Grid container spacing={3} mt={6}>
            {cartItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <CartView cartItem={item} handleRemove={handleRemoveFromCart} />
              </Grid>
            ))}
          </Grid>
      )}

      <Box sx={{position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', p: 2, bgcolor: 'background.paper'}}>
        <Button
          variant="contained"
          color="error"
          onClick={handleClearCart}
          sx={{ mt: 2 }}
        >
          Remove All Items
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleCheckout}
          sx={{ mt: 2, ml: 2 }}
        >
          Proceed to Checkout
        </Button>
        <Button
          variant="contained"
          onClick={handleBackToHome}
          sx={{ mt: 2, ml: 2 }}
        >
          Continue Shopping
        </Button>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Purchase Completed</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your purchase was completed successfully.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
};

export default CartPage;