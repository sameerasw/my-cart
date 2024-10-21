import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartView from '../components/CartView';
import { Container, Typography, Button, Grid, IconButton, AppBar, Toolbar, useTheme, useMediaQuery, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { CartState } from '../store/CartState';
import { CartItem } from '../store/CartItem';
import { removeItem, clearCart } from '../store/cartSlice';

const CartPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { cartItems } = useSelector((state: { cart: CartState }) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = (itemId: number) => {
    dispatch(removeItem(itemId));
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleClearCart = () => {
    dispatch(clearCart());
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
        <>
          <Grid container spacing={3} mt={6}>
            {cartItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <CartView cartItem={item} handleRemove={handleRemoveFromCart} />
              </Grid>
            ))}
          </Grid>
        </>
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



    </Container>
  );
};

export default CartPage;