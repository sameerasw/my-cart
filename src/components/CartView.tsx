import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { CartItem } from '../types/Cart';

interface CartViewProps {
  cartItem: CartItem;
  handleRemove: (cartItemId: number) => void;
}

const CartView: React.FC<CartViewProps> = ({ cartItem, handleRemove }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={cartItem.image}
        alt={cartItem.eventName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {cartItem.eventName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${cartItem.ticketPrice}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          Quantity: {cartItem.quantity}
        </Typography> */}
        <Box mt={2}>
          <Button variant="contained" color="secondary" onClick={() => handleRemove(cartItem.id)}>
            Remove
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CartView;