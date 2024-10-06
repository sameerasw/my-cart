import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartView from '../components/CartView';
import { Container, Typography, Button, Grid } from '@mui/material';
import { CartState} from '../store/CartState';
import { CartItem } from '../store/CartItem';
import { removeItem } from '../store/cartSlice'; // Import your removeItem action

const CartPage: React.FC = () => {
  // Get cart items from Redux store
  const { cartItems } = useSelector((state: { cart: CartState }) => state.cart);
  // Use the 'useDispatch' hook from react-redux
  const dispatch = useDispatch();

  // Remove Item Functionality (Calls Redux Action)
  const handleRemoveFromCart = (itemId: number) => {
    dispatch(removeItem(itemId));
  };

  return (
    <Container maxWidth="lg" sx={{ padding: 2, mt: 2 }}>
      <Typography variant="h3" gutterBottom>
        Shopping Cart
      </Typography>

      {/* Check if Cart is Empty */}
      {cartItems.length === 0 ? (
        <Typography variant="body1" align="center" mt={2}>
          Your cart is empty.
        </Typography>
      ) : (
        // Render Cart Items (using the CartView component)
        <Grid container spacing={3}>
          {cartItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              {/* Pass the cart item and handleRemove function */}
              <CartView cartItem={item} handleRemove={handleRemoveFromCart} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* ... Checkout button logic (you can implement it here if needed)... */}

    </Container>
  );
};

export default CartPage;