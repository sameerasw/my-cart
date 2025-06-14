import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CartView from '../CartView';
import {
    Container,
    Typography,
    Button,
    Grid2 as Grid,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    CircularProgress,
    Paper,
    Divider,
    alpha
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { useNavigate } from 'react-router-dom';
import { useGetCartItemsByCustomerIdQuery, useRemoveCartItemMutation, useClearCartMutation } from '../../api/cartApiSlice';
import { UserState } from '../../store/AuthState';

const Cart: React.FC = () => {
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
            refetch();
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
            refetch();
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
            refetch();
        } catch (error) {
            console.error('Failed to complete purchase:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        navigate('/');
    };

    useEffect(() => {
        if (!customerId) {
            navigate('/auth/login');
        } else {
            refetch();
        }
    }, [customerId, navigate, refetch]);

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: { xs: 16, md: 12 } }}>
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Typography
                        variant="h4"
                        sx={{
                            mb: 2,
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        Shopping Cart
                    </Typography>
                    {!isLoading && cartItems.length > 0 && (
                        <Typography variant="body1" color="text.secondary">
                            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
                        </Typography>
                    )}
                </Box>

                {isLoading ? (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '400px',
                        gap: 3
                    }}>
                        <CircularProgress size={48} thickness={4} />
                        <Typography variant="h6" color="text.secondary">
                            Loading your cart...
                        </Typography>
                    </Box>
                ) : cartItems.length === 0 ? (
                    <Paper sx={{
                        p: 8,
                        textAlign: 'center',
                        bgcolor: alpha('#64748b', 0.05),
                        border: '1px solid',
                        borderColor: 'grey.200',
                    }}>
                        <ShoppingCartIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                            Your cart is empty
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                            Discover amazing products and add them to your cart
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleBackToHome}
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 2,
                            }}
                        >
                            Start Shopping
                        </Button>
                    </Paper>
                ) : (
                    <Grid container spacing={4}>
                        {cartItems.map((item) => (
                            <Grid key={item.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                                <CartView cartItem={item} handleRemove={handleRemoveFromCart} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>

            {/* Fixed bottom bar for cart actions */}
            {cartItems.length > 0 && (
                <Paper sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: { xs: 2, md: 3 },
                    boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
                    borderTop: '1px solid',
                    borderColor: 'grey.200',
                    zIndex: 1000,
                }}>
                    <Container maxWidth="xl">
                        <Box sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignItems: { xs: 'stretch', md: 'center' },
                            justifyContent: 'space-between',
                            gap: 2
                        }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
                                <Typography variant="body2" color="text.secondary">
                                    Total Amount
                                </Typography>
                                <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                    ${totalPrice.toFixed(2)}
                                </Typography>
                            </Box>

                            <Box sx={{
                                display: 'flex',
                                gap: 2,
                                flexDirection: { xs: 'column', sm: 'row' },
                                width: { xs: '100%', md: 'auto' }
                            }}>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={handleClearCart}
                                    disabled={loading}
                                    sx={{
                                        minWidth: { xs: 'auto', sm: 140 },
                                        py: 1.5,
                                        borderRadius: 2,
                                    }}
                                >
                                    {loading ? <CircularProgress size={20} /> : 'Clear Cart'}
                                </Button>

                                <Button
                                    variant="outlined"
                                    onClick={handleBackToHome}
                                    disabled={loading}
                                    sx={{
                                        minWidth: { xs: 'auto', sm: 140 },
                                        py: 1.5,
                                        borderRadius: 2,
                                    }}
                                >
                                    Continue Shopping
                                </Button>

                                <Button
                                    variant="contained"
                                    onClick={handleCheckout}
                                    disabled={loading}
                                    size="large"
                                    sx={{
                                        minWidth: { xs: 'auto', sm: 160 },
                                        py: 1.5,
                                        borderRadius: 2,
                                        fontWeight: 600,
                                    }}
                                >
                                    {loading ? <CircularProgress size={20} color="inherit" /> : 'Checkout'}
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </Paper>
            )}

            {/* Success Dialog */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                PaperProps={{
                    sx: { borderRadius: 3, textAlign: 'center' }
                }}
            >
                <DialogContent sx={{ pt: 4, pb: 2 }}>
                    <CelebrationIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
                    <DialogTitle sx={{ p: 0, mb: 1 }}>
                        Purchase Completed!
                    </DialogTitle>
                    <DialogContentText>
                        Thank you for your purchase. Your order has been successfully processed.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
                    <Button
                        onClick={handleCloseDialog}
                        variant="contained"
                        size="large"
                        sx={{ minWidth: 120, borderRadius: 2 }}
                    >
                        Continue Shopping
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Cart;
