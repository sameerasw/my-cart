import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, CardMedia, Box, Rating, Slide, Chip, Divider, alpha } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Product } from '../types/Product';
import { useAddRatingMutation, useGetRatingByCustomerAndProductQuery } from '../api/ratingApiSlice';
import { useSelector } from 'react-redux';
import { UserState } from '../store/AuthState';
import { useAddCartItemMutation, useGetCartItemsByCustomerIdQuery } from '../api/cartApiSlice';
import { TransitionProps } from '@mui/material/transitions';

interface ProductDetailsDialogProps {
    open: boolean;
    onClose: () => void;
    product: Product | null;
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

    const { data: existingRating, refetch: refetchRating } = useGetRatingByCustomerAndProductQuery(
        { customerId: customerId as number, productId: product?.id as number },
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
                await addRating({ customerId, productId: product.id, rating: newValue }).unwrap();
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
            refetch();
            console.log('Item added to cart successfully');
        } catch (error) {
            console.error('Failed to add item to cart:', error);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
            TransitionComponent={Transition}
            keepMounted
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    maxHeight: '90vh',
                }
            }}
        >
            <DialogTitle sx={{ pb: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, pr: 2 }}>
                        {product.productName}
                    </Typography>
                    <Chip
                        label={`$${product.productPrice}`}
                        sx={{
                            bgcolor: 'primary.main',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '1rem',
                            height: 32,
                        }}
                    />
                </Box>
            </DialogTitle>

            <DialogContent sx={{ px: 3, py: 2 }}>
                {addedToCart ? (
                    <Box sx={{
                        textAlign: 'center',
                        py: 6,
                        bgcolor: alpha('#10b981', 0.1),
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: alpha('#10b981', 0.2),
                    }}>
                        <CheckCircleIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
                        <Typography variant="h6" sx={{ color: 'success.main', fontWeight: 600 }}>
                            Added to Cart Successfully!
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Item has been added to your shopping cart
                        </Typography>
                    </Box>
                ) : (
                    <Box>
                        <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
                            <Box sx={{ flex: 1 }}>
                                <CardMedia
                                    component="img"
                                    image={product.image}
                                    alt={product.productName}
                                    sx={{
                                        width: '100%',
                                        height: 300,
                                        objectFit: "cover",
                                        borderRadius: 2,
                                    }}
                                />
                            </Box>

                            <Box sx={{ flex: 1, pl: 2 }}>
                                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                                    {product.details}
                                </Typography>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                            Vendor
                                        </Typography>
                                        <Chip
                                            label={product.vendorName}
                                            variant="outlined"
                                            sx={{ fontWeight: 500 }}
                                        />
                                    </Box>

                                    <Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            Average Rating
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Rating value={product.avgRating} readOnly precision={0.5} />
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {product.avgRating.toFixed(1)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                )}
            </DialogContent>

            <Divider />

            <DialogActions sx={{ p: 3, justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {existingRating !== undefined ? 'Your rating:' : 'Rate this product:'}
                    </Typography>
                    <Rating
                        name="product-rating"
                        value={rating}
                        onChange={handleRatingChange}
                        precision={1}
                        sx={{ ml: 1 }}
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        sx={{ minWidth: 100 }}
                    >
                        Close
                    </Button>
                    {!addedToCart && (
                        <Button
                            variant="contained"
                            onClick={handleAddToCart}
                            startIcon={<ShoppingCartIcon />}
                            sx={{ minWidth: 140 }}
                        >
                            Add to Cart
                        </Button>
                    )}
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default ProductDetailsDialog;
