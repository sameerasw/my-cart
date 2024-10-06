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
      title: "Awesome Product 1", 
      imageUrl: "https://placehold.co/600x400",
      price: 19.99,
      rating: 4.5,
      description: "A fantastic product that you simply must try!" 
    },
    {
      id: 6,
      title: "Cool Gadget", 
      imageUrl: "https://placehold.co/600x400",
      price: 49.99, 
      rating: 3.5,
      description: "A cool gadget that everyone wants."
    },
    { 
      id: 7, 
      title: "Stylish Accessory", 
      imageUrl: "https://placehold.co/600x400", 
      price: 24.99, 
      rating: 4, 
      description: "A stylish accessory to elevate your style!"
    },
    {
      id: 8,
      title: "Great Value Product",
      imageUrl: "https://placehold.co/600x400",
      price: 10.99,
      rating: 5, 
      description: "The most affordable product on the market!" 
    },
    {
      id: 9,
      title: "Great Value Product",
      imageUrl: "https://placehold.co/600x400",
      price: 10.99,
      rating: 5, 
      description: "The most affordable product on the market"
    },
    {
      id: 10,
      title: "Great Value Product",
      imageUrl: "https://placehold.co/600x400",
      price: 10.99,
      rating: 5, 
      description: "The most affordable product on the market"
    },
    {
      id: 11,
      title: "Great Value Product",
      imageUrl: "https://placehold.co/600x400",
      price: 10.99,
      rating: 5, 
      description: "The most affordable product on the market"
    },
    {
      id: 12,
      title: "Great Value Product",
      imageUrl: "https://placehold.co/600x400",
      price: 10.99,
      rating: 5, 
      description: "The most affordable product on the market"
    },
    {
      id: 13,
      title: "Great Value Product",
      imageUrl: "https://placehold.co/600x400",
      price: 10.99,
      rating: 5, 
      description: "The most affordable product on the market"
    },
    {
      id: 14,
      title: "Great Value Product",
      imageUrl: "https://placehold.co/600x400",
      price: 10.99,
      rating: 5, 
      description: "The most affordable product on the market"
    },
    {
      id: 15,
      title: "Great Value Product",
      imageUrl: "https://placehold.co/600x400",
      price: 10.99,
      rating: 5, 
      description: "The most affordable product on the market"
    },
    {
      id: 16,
      title: "Great Value Product",
      imageUrl: "https://placehold.co/600x400",
      price: 10.99,
      rating: 5, 
      description: "The most affordable product on the market"
    },
    {
      id: 17,
      title: "Great Value Product",
      imageUrl: "https://placehold.co/600x400",
      price: 10.99,
      rating: 5, 
      description: "The most affordable product on the market"
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

  // Get a function to navigate (toCart is just an alias) 
  const navigate = useNavigate(); 

  const toCart = () => {
    navigate('/cart'); 
  };
  

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
            {/* Logo or Title */}
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
            <Badge badgeContent={4} color="secondary"> 
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