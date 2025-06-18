import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CircularProgress, Box, Divider, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartItem } from '../types/Cart';

interface CartViewProps {
  cartItem: CartItem;
  handleRemove: (cartItemId: number) => void;
}

const CartView: React.FC<CartViewProps> = ({ cartItem, handleRemove }) => {
  const [loading, setLoading] = useState(false);

  const handleRemoveClick = async () => {
    setLoading(true);
    handleRemove(cartItem.id);
    setLoading(false);
  };

  return (
    <Card sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
      }
    }}>
      <CardMedia
        component="img"
        height="200"
        image={cartItem.image}
        alt={cartItem.productName}
        sx={{ objectFit: 'cover' }}   
      />

      <CardContent sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        p: 3,
      }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 600,
            mb: 2,
            lineHeight: 1.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {cartItem.productName}
        </Typography>

        <Box sx={{ mt: 'auto' }}>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
              ${cartItem.productPrice}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Qty: {cartItem.quantity}
            </Typography>
          </Box>

          <Button
            variant="outlined"
            color="error"
            onClick={handleRemoveClick}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} /> : <DeleteIcon />}
            fullWidth
            sx={{
              borderRadius: 2,
              py: 1,
              fontWeight: 600,
            }}
          >
            {loading ? 'Removing...' : 'Remove'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CartView;