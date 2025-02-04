import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CartView from '../components/CartView';
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGetCartItemsByCustomerIdQuery, useRemoveCartItemMutation, useClearCartMutation } from '../api/cartApiSlice';
import { UserState } from '../store/AuthState';
import NavBar from '../components/NavBar';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { userId: customerId } = useSelector((state: { auth: UserState }) => state.auth);

  const { data: cartData, isLoading, refetch } = useGetCartItemsByCustomerIdQuery(customerId as number, { skip: !customerId });
  const cartItems = cartData?.cartItems || [];
  const totalPrice = cartData?.totalPrice || 0;
  const [removeCartItem] = useRemoveCartItemMutation();
  const [clearCart] = useClearCartMutation();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRemoveFromCart = async (cartItemId: number) => {
    setLoading(true);
    try {
      await removeCartItem(cartItemId).unwrap();
      refetch(); // Reload the cart items list
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearCart = async () => {
    setLoading(true);
    try {
      await clearCart(customerId as number).unwrap();
      refetch(); // Reload the cart items list
    } catch (error) {
      console.error('Failed to clear cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      await clearCart(customerId as number).unwrap();
      setOpenDialog(true);
      refetch(); // Reload the cart items list
    } catch (error) {
      console.error('Failed to complete purchase:', error);
    } finally {
      setLoading(false);
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
      <NavBar backEnabled={true} />
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {cartItems.length === 0 ? (
            <Typography variant="body1" align="center" mt={2} sx={{ mt: 6 }}>
              Your cart is empty.
            </Typography>
          ) : (
            <Box sx={{ mt: 6 }}>
              <Typography variant="h6" mb={2}>
                You have {cartItems.length} item(s) in your cart.
              </Typography>
              <Grid container spacing={3} mb={12}>
                {cartItems.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <CartView cartItem={item} handleRemove={handleRemoveFromCart} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </>
      )}

      <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', p: 2, bgcolor: 'white', boxShadow: 2 }}>
        <Button
          variant="contained"
          color="error"
          onClick={handleClearCart}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Remove All Items'}
        </Button>
        <Box sx={{ mx: 2, textAlign: 'right', alignContent: 'center' }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleCheckout}
            sx={{ ml: 0.5, p: 0.5 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Proceed to Checkout'}
            <Typography variant="body1" sx={{ display: 'block', backgroundColor: 'white', color: 'green', p: 1, borderRadius: 1, ml: 2 }}>
              Total : ${totalPrice}
            </Typography>
          </Button>
        </Box>
        <Button
          variant="contained"
          onClick={handleBackToHome}
          sx={{ ml: 0.5 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Continue Shopping'}
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