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
import { Product } from '../types/Product';
import ProductCard from '../components/ProductCard'; 
import { useNavigate } from 'react-router-dom'; 
import { useSelector } from 'react-redux';
import { CartState } from '../store/CartState';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [products, setProducts] = useState<Product[]>([
    { 
      id: 1, 
      title: "Awesome Product 1", 
      imageUrl: "https://placehold.co/600x400",
      price: 19.99,
      rating: 4.5,
      description: "A fantastic product that you simply must try!" 
    },
    {
      id: 2,
      title: "Cool Gadget", 
      imageUrl: "https://placehold.co/600x400",
      price: 49.99, 
      rating: 3.5,
      description: "A cool gadget that everyone wants."
    },
    { 
      id: 3, 
      title: "Stylish Accessory", 
      imageUrl: "https://placehold.co/600x400", 
      price: 24.99, 
      rating: 4, 
      description: "A stylish accessory to elevate your style!"
    },
    {
      id: 4,
      title: "Great Value Product",
      imageUrl: "https://placehold.co/600x400",
      price: 10.99,
      rating: 5, 
      description: "The most affordable product on the market!" 
    },
    { 
      id: 5, 
      title: "Innovative Tool", 
      imageUrl: "https://placehold.co/600x400",
      price: 29.99,
      rating: 4.7,
      description: "An innovative tool that makes your life easier." 
    },
    {
      id: 6,
      title: "High-Tech Device", 
      imageUrl: "https://placehold.co/600x400",
      price: 99.99, 
      rating: 4.2,
      description: "A high-tech device for tech enthusiasts."
    },
    { 
      id: 7, 
      title: "Elegant Watch", 
      imageUrl: "https://placehold.co/600x400", 
      price: 199.99, 
      rating: 4.8, 
      description: "An elegant watch to complement your style."
    },
    {
      id: 8,
      title: "Portable Speaker",
      imageUrl: "https://placehold.co/600x400",
      price: 59.99,
      rating: 4.3, 
      description: "A portable speaker with excellent sound quality." 
    },
    {
      id: 9,
      title: "Wireless Earbuds",
      imageUrl: "https://placehold.co/600x400",
      price: 39.99,
      rating: 4.1, 
      description: "Wireless earbuds with great sound and comfort."
    },
    {
      id: 10,
      title: "Smart Home Hub",
      imageUrl: "https://placehold.co/600x400",
      price: 79.99,
      rating: 4.6, 
      description: "A smart home hub to control all your devices."
    },
    {
      id: 11,
      title: "Fitness Tracker",
      imageUrl: "https://placehold.co/600x400",
      price: 49.99,
      rating: 4.4, 
      description: "A fitness tracker to monitor your health."
    },
    {
      id: 12,
      title: "Gaming Console",
      imageUrl: "https://placehold.co/600x400",
      price: 299.99,
      rating: 4.9, 
      description: "A gaming console for the ultimate gaming experience."
    },
    {
      id: 13,
      title: "Noise Cancelling Headphones",
      imageUrl: "https://placehold.co/600x400",
      price: 89.99,
      rating: 4.5, 
      description: "Noise cancelling headphones for immersive sound."
    },
    {
      id: 14,
      title: "Smartphone",
      imageUrl: "https://placehold.co/600x400",
      price: 699.99,
      rating: 4.7, 
      description: "A smartphone with the latest features and technology."
    },
    {
      id: 15,
      title: "Laptop",
      imageUrl: "https://placehold.co/600x400",
      price: 999.99,
      rating: 4.8, 
      description: "A powerful laptop for work and play."
    },
    {
      id: 16,
      title: "Tablet",
      imageUrl: "https://placehold.co/600x400",
      price: 399.99,
      rating: 4.6, 
      description: "A versatile tablet for entertainment and productivity."
    },
    {
      id: 17,
      title: "Smartwatch",
      imageUrl: "https://placehold.co/600x400",
      price: 149.99,
      rating: 4.4, 
      description: "A smartwatch to keep you connected on the go."
    }
  ]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [mobileOpen, setMobileOpen] = useState(false);

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
          <ListItemButton onClick={() => {}}>
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
          <IconButton 
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle} 
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton> 
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}> 
            {/* Logo */}
          </Typography> 
          <TextField
            fullWidth
            label="Search" 
            variant="outlined"
            value={searchTerm} 
            onChange={handleSearchChange} 
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
          <Grid container spacing={3}>
            {products
              .filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase()) 
              )
              .map((product) => ( 
                <ProductCard key={product.id} product={product} /> 
              ))}
          </Grid> 
        </Container> 
      </Box>
    </Box> 
  ); 
};

export default HomePage;