import React, { useState, useEffect } from 'react';
import {
    Grid2 as Grid,
    Container,
    Typography,
    Box,
    CircularProgress,
    Paper,
    alpha,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { useGetAllProductsQuery } from '../../api/itemApiSlice';
import ProductCard from '../ProductCard';
import { UserState } from '../../store/AuthState';
import { useGetCartItemsByCustomerIdQuery } from '../../api/cartApiSlice';
import ProductDetailsDialog from '../ProductDetailsDialog';
import { Product } from '../../types/Product';

interface OutletContext {
    searchTerm: string;
}

const Home: React.FC = () => {
    const { searchTerm } = useOutletContext<OutletContext>();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const { data, isLoading, error, refetch } = useGetAllProductsQuery();

    useEffect(() => {
        if (data) {
            setProducts(data);
        }
    }, [data]);

    useEffect(() => {
        refetch();
    }, [dialogOpen, refetch]);

    const { userId: customerId } = useSelector((state: { auth: UserState }) => state.auth);
    const { refetch: refetchCartItems } = useGetCartItemsByCustomerIdQuery(customerId as number, { skip: !customerId });

    useEffect(() => {
        if (customerId) {
            refetchCartItems();
        }
    }, [customerId, dialogOpen, refetchCartItems]);

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedProduct(null);
        refetch();
    };

    const filteredProducts = products.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography
                        variant="h4"
                        sx={{
                            mb: 2,
                            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        Discover Amazing Products
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: 'text.secondary',
                            maxWidth: 600,
                            mx: 'auto',
                            fontSize: '1.1rem',
                        }}
                    >
                        Explore our curated collection of high-quality products from trusted vendors
                    </Typography>
                </Box>

                {(() => {
                    if (isLoading) {
                        return (
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
                                    Loading products...
                                </Typography>
                            </Box>
                        );
                    } else if (error) {
                        return (
                            <Paper
                                sx={{
                                    p: 4,
                                    textAlign: 'center',
                                    bgcolor: alpha('#ef4444', 0.1),
                                    border: '1px solid',
                                    borderColor: alpha('#ef4444', 0.2),
                                }}
                            >
                                <Typography variant="h6" color="error.main">
                                    Unable to load products
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    Please try again later
                                </Typography>
                            </Paper>
                        );
                    } else if (filteredProducts.length === 0) {
                        return (
                            <Paper sx={{ p: 6, textAlign: 'center' }}>
                                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                                    {searchTerm ? 'No products found' : 'No products available'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {searchTerm
                                        ? `Try adjusting your search for "${searchTerm}"`
                                        : 'Check back later for new products'
                                    }
                                </Typography>
                            </Paper>
                        );
                    } else {
                        return (
                            <>
                                {searchTerm && (
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="body1" color="text.secondary">
                                            {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for "{searchTerm}"
                                        </Typography>
                                    </Box>
                                )}
                                <Grid
                                    container
                                    spacing={4}
                                    sx={{
                                        justifyContent: { xs: 'center', sm: 'flex-start' },
                                    }}
                                >
                                    {filteredProducts.map((product) => (
                                        <Grid key={product.id}>
                                            <ProductCard
                                                product={product}
                                                onClick={() => handleProductClick(product)}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </>
                        );
                    }
                })()}
            </Container>

            <ProductDetailsDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                product={selectedProduct}
            />
        </Box>
    );
};

export default Home;
