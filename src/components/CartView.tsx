import { useSelector } from 'react-redux';
import { CartState } from '../store/CartState';
import { ListItem, ListItemText, List, Typography, Grid, Container, ListItemIcon, Avatar, Box } from '@mui/material'; 

const CartView: React.FC = () => {
  const { cartItems } = useSelector((state: { cart: CartState }) => state.cart); 

  return ( 
    <Container maxWidth="lg" sx={{ padding: 2, mt: 2 }}> 
      <Typography variant="h4" gutterBottom>My Cart</Typography>
      {cartItems.length === 0 ? ( 
        <Typography variant="body1" align="center" mt={2}> 
          Your cart is empty.
        </Typography>
      ) : (
        <List>
          {cartItems.map((item) => ( 
            <ListItem key={item.id}> 
              <ListItemIcon> 
                <Avatar src={item.imageUrl} />
              </ListItemIcon> 
              <ListItemText primary={item.title} /> 
              
            </ListItem>
          ))}
        </List>
      )} 
    </Container> 
  ); 
};

export default CartView;