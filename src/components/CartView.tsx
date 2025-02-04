import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CircularProgress, Box } from '@mui/material';
import { CartItem } from '../types/Cart';

interface CartViewProps {
  cartItem: CartItem;
  handleRemove: (cartItemId: number) => void;
}

const CartView: React.FC<CartViewProps> = ({ cartItem, handleRemove }) => {
  const [loading, setLoading] = useState(false);

  const handleRemoveClick = async () => {
    setLoading(true);
    await handleRemove(cartItem.id);
    setLoading(false);
  };

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{flexGrow: 1}}>
          {cartItem.eventName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${cartItem.ticketPrice}
        </Typography>
        <Box mt={2}>
          <Button variant="contained" color="secondary" onClick={handleRemoveClick} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Remove'}
          </Button>
        </Box>
      </CardContent>
      <CardMedia
        component="img"
        height="100%"
        image={cartItem.image}
        alt={cartItem.eventName}
      />
    </Card>
  );
};

export default CartView;