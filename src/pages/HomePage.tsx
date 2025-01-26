import React, { useState } from 'react';
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
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CartState } from '../store/CartState';
import { useGetAllEventsQuery } from '../api/itemApiSlice';
import ProductCard from '../components/ProductCard';

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

  const toCart = () => {
    navigate('/cart');
  };

  // Get cart items from Redux store
  const { cartItems } = useSelector((state: { cart: CartState }) => state.cart);

  // Calculate total number of items in the cart
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

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

      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h5" sx={{ ml: 2, flexGrow: 1 }}>
            My Cart App
          </Typography>
          <TextField
            fullWidth
            label="Search"
            variant="outlined"
            size='small'
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ width: '300px', marginLeft: 'auto', marginRight: '10px' }}
          />
          <IconButton size="large" color="inherit">
            <Typography variant="h6" noWrap component="div">
              Login
            </Typography>
          </IconButton>
          <IconButton size="large" color="inherit" onClick={toCart}>
            <Badge badgeContent={totalItemsInCart} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

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
                  <ProductCard key={product.id} product={product} />
                ))}
            </Grid>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;