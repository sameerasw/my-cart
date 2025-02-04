import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography, CardMedia, Box, Rating, Slide } from '@mui/material';
import { EventItem } from '../types/Item';
import { useAddRatingMutation, useGetRatingByCustomerAndEventQuery } from '../api/ratingApiSlice';
import { useSelector } from 'react-redux';
import { UserState } from '../store/AuthState';
import { useAddCartItemMutation, useGetCartItemsByCustomerIdQuery } from '../api/cartApiSlice';
import { TransitionProps } from '@mui/material/transitions';

interface ProductDetailsDialogProps {
    open: boolean;
    onClose: () => void;
    product: EventItem | null;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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
            await addCartItem({ customerId, productId: product.id, quantity: 1 }).unwrap();
            setAddedToCart(true);
            refetch(); // Reload the cart items list
            console.log('Item added to cart successfully');
        } catch (error) {
            console.error('Failed to add item to cart:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" sx={{
            backdropFilter: 'blur(5px)',
        }}
            TransitionComponent={Transition}
            keepMounted
        >
            <DialogTitle>{product.productName}</DialogTitle>
            <DialogContent>
                {addedToCart ? (
                    <DialogContentText>
                        Item added to cart successfully.
                    </DialogContentText>
                ) : (
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <CardMedia
                            component="img"
                            height="100%"
                            image={product.image}
                            alt={product.productName}
                            sx={{ objectFit: "cover", marginBottom: 2 }}
                        />
                        <Typography variant="h5" color="textSecondary">
                            {product.details}
                        </Typography>
                        <Typography variant="body1">Price: ${product.productPrice}</Typography>
                        {/* <Typography variant="body2" color="textSecondary">
                            Available Tickets: {product.availableTickets}
                        </Typography> */}
                        <Typography variant="body2" color="textSecondary">
                            Vendor: {product.vendorName}
                        </Typography>
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 'auto', ml: 1 }}>
                    <Typography variant="body2" sx={{ mr: 1 }}>
                        {existingRating !== undefined ? 'Your rating:' : 'Rate this product:'}
                    </Typography>
                    <Rating
                        name="product-rating"
                        value={rating}
                        onChange={handleRatingChange}
                        precision={1}
                    />
                </Box>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
                {!addedToCart &&
                    <Button variant="contained" onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                }
            </DialogActions>
        </Dialog>
    );
};

export default ProductDetailsDialog;
