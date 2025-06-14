import React, { useState, useEffect } from 'react';
import {
    Grid2 as Grid,
    Container,
    Typography,
    Box,
    CircularProgress,
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

    return (
        <Container maxWidth="lg" sx={{ marginTop: 2, paddingBottom: 2 }}>
            <Typography variant="h4" gutterBottom mb={2}>Our Products</Typography>
            {(() => {
                if (isLoading) {
                    return (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                            <CircularProgress />
                        </Box>
                    );
                } else if (error) {
                    return <Typography>Error loading products</Typography>;
                } else {
                    return (
                        <Grid container spacing={3}>
                            {products
                                .filter((product) =>
                                    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map((product) => (
                                    <ProductCard key={product.id} product={product} onClick={() => handleProductClick(product)} />
                                ))}
                        </Grid>
                    );
                }
            })()}
            <ProductDetailsDialog open={dialogOpen} onClose={handleDialogClose} product={selectedProduct} />
        </Container>
    );
};

export default Home;
