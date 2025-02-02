import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography, CardMedia, Box, Rating } from '@mui/material';
import { EventItem } from '../types/Item';
import { useAddRatingMutation, useGetRatingByCustomerAndEventQuery } from '../api/ratingApiSlice';
import { useSelector } from 'react-redux';
import { UserState } from '../store/AuthState';
import { useAddCartItemMutation, useGetCartItemsByCustomerIdQuery } from '../api/cartApiSlice';

interface ProductDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  product: EventItem | null;
}

const ProductDetailsDialog: React.FC<ProductDetailsDialogProps> = ({ open, onClose, product }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [addRating] = useAddRatingMutation();
  const { userId: customerId } = useSelector((state: { auth: UserState }) => state.auth);
  const [addCartItem] = useAddCartItemMutation();
  const { refetch } = useGetCartItemsByCustomerIdQuery(customerId as number, { skip: !customerId });
  const [addedToCart, setAddedToCart] = useState(false);

  const { data: existingRating, refetch: refetchRating } = useGetRatingByCustomerAndEventQuery(
    { customerId: customerId as number, eventItemId: product?.id as number },
    { skip: !customerId || !product }
  );

  useEffect(() => {
    if (!open) {
      setAddedToCart(false);
      setRating(null);
    }
  }, [open, refetchRating]);

  useEffect(() => {
    if (existingRating !== undefined) {
      setRating(existingRating);
    }
  }, [existingRating]);

  if (!product) return null;

  const handleRatingChange = async (event: React.SyntheticEvent, newValue: number | null) => {
    if (!customerId) {
      alert('Please log in to rate the product.');
      return;
    }

    setRating(newValue);
    if (newValue !== null) {
      try {
        await addRating({ customerId, eventItemId: product.id, rating: newValue }).unwrap();
        console.log('Rating submitted successfully');
        refetchRating();
      } catch (error) {
        console.error('Failed to submit rating:', error);
      }
    }
  };

  const handleAddToCart = async () => {
    if (!customerId) {
      alert('Please log in to add items to the cart.');
      return;
    }

    try {
      await addCartItem({ customerId, eventItemId: product.id, quantity: 1 }).unwrap();
      setAddedToCart(true);
      refetch(); // Reload the cart items list
      console.log('Item added to cart successfully');
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{product.eventName}</DialogTitle>
      <DialogContent>
        {addedToCart ? (
          <DialogContentText>
            Item added to cart successfully.
          </DialogContentText>
        ) : (
          <Box display="flex" flexDirection="column" alignItems="center">
            <CardMedia
              component="img"
              height="300"
              image={product.image}
              alt={product.eventName}
              sx={{ objectFit: "cover", marginBottom: 2 }}
            />
            <Typography variant="h6">Price: ${product.ticketPrice}</Typography>
            <Typography variant="body1" color="textSecondary">
              {product.details}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Available Tickets: {product.availableTickets}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Vendor: {product.vendorName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <Typography variant="body2" sx={{ mr: 1 }}>
                {existingRating !== undefined ? 'Your rating:' : 'Rate this product:'}
              </Typography>
              <Rating
                name="product-rating"
                value={rating}
                onChange={handleRatingChange}
                precision={0.5}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button variant="contained" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDetailsDialog;
