import React, { useState, useEffect } from 'react';
import {
  Grid,
  Container,
  TextField,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  CssBaseline,
  useMediaQuery,
  Box,
  Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CartState } from '../store/CartState';
import { useGetAllEventsQuery } from '../api/itemApiSlice';
import ProductCard from '../components/ProductCard';
import { UserState } from '../store/AuthState';
import { useGetCartItemsByCustomerIdQuery, useAddCartItemMutation } from '../api/cartApiSlice';
import NavBar from '../components/NavBar';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: products = [], isLoading, error } = useGetAllEventsQuery();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const navigate = useNavigate();

  const { userId: customerId, name } = useSelector((state: { auth: UserState }) => state.auth);
  const { data: cartItems = [], refetch } = useGetCartItemsByCustomerIdQuery(customerId as number, { skip: !customerId });
  const [addCartItem] = useAddCartItemMutation();

  useEffect(() => {
    if (customerId) {
      refetch();
    }
  }, [customerId]);

  const toCart = () => {
    if (!customerId) {
      navigate('/login');
    } else {
      navigate('/cart');
    }
  };

  const handleAddToCart = async (productId: number) => {
    if (!customerId) {
      navigate('/login');
    } else {
      try {
        await addCartItem({ customerId, eventItemId: productId, quantity: 1 }).unwrap();
        refetch(); // Reload the cart items list
      } catch (error) {
        console.error('Failed to add item to cart:', error);
      }
    }
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
          backgroundColor: '#e7e8e8'
        }}
      >
        <Container maxWidth="lg" sx={{ marginTop: 2, paddingBottom: 2 }}>
          <Typography variant="h4" gutterBottom mb={2}>Our Products</Typography>
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : error ? (
            <Typography>Error loading products</Typography>
          ) : (
            <Grid container spacing={3}>
              {products
                .filter((product) =>
                  product.eventName.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={() => handleAddToCart(product.id)} />
                ))}
            </Grid>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;