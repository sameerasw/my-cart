import React, { useState, useEffect } from 'react';
import {
  Grid2 as Grid,
  Container,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  CssBaseline,
  useMediaQuery,
  Box,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import { useGetAllEventsQuery } from '../api/itemApiSlice';
import ProductCard from '../components/ProductCard';
import { UserState } from '../store/AuthState';
import { useGetCartItemsByCustomerIdQuery } from '../api/cartApiSlice';
import NavBar from '../components/NavBar';
import ProductDetailsDialog from '../components/ProductDetailsDialog';
import { EventItem } from '../types/Item';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<EventItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [products, setProducts] = useState<EventItem[]>([]);
  const { data, isLoading, error, refetch } = useGetAllEventsQuery();

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [dialogOpen, refetch]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const { userId: customerId } = useSelector((state: { auth: UserState }) => state.auth);
  const { refetch: refetchCartItems } = useGetCartItemsByCustomerIdQuery(customerId as number, { skip: !customerId });

  useEffect(() => {
    if (customerId) {
      refetchCartItems();
    }
  }, [customerId, dialogOpen, refetchCartItems]);

  const handleProductClick = (product: EventItem) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedProduct(null);
    refetch(); // Reload the data when closing the dialog
  };

  const drawer = (
    <div>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => { }}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="My Cart" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingTop: '100px',
        }}
      >
        <Container maxWidth="lg" sx={{ marginTop: 2, paddingBottom: 2 }}>
          <Typography variant="h4" gutterBottom mb={2}>Our Products</Typography>
          {(() => {
            if (isLoading) {
              return <Typography>Loading...</Typography>;
            } else if (error) {
              return <Typography>Error loading products</Typography>;
            } else {
              return (
                <Grid container spacing={3}>
                  {products
                    .filter((product) =>
                      product.eventName.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((product) => (
                      <ProductCard key={product.id} product={product} onClick={() => handleProductClick(product)} />
                    ))}
                </Grid>
              );
            }
          })()}
        </Container>
      </Box>
      <ProductDetailsDialog open={dialogOpen} onClose={handleDialogClose} product={selectedProduct} />
    </Box>
  );
};

export default HomePage;