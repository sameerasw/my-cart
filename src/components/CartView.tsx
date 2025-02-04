import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { CartItem } from '../types/Cart';

interface CartViewProps {
  cartItem: CartItem;
  handleRemove: (cartItemId: number) => void;
}

const CartView: React.FC<CartViewProps> = ({ cartItem, handleRemove }) => {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{flexGrow: 1}}>
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
      <CardMedia
        component="img"
        // height="200"
        height="100%"
        image={cartItem.image}
        alt={cartItem.eventName}
      />
    </Card>
  );
};

export default CartView;