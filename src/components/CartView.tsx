// CartView.tsx

import { 
  ListItem, 
  ListItemText, 
  List, 
  Typography,
  Grid, 
  Container, 
  ListItemIcon, 
  Avatar, 
  Box, 
  IconButton,  
  TextField,  // Add TextField for quantity
  InputAdornment, // For the quantity input
} from '@mui/material';
import { CartItem } from '../store/CartItem';
import { useDispatch } from 'react-redux'; 

interface CartViewProps { 
  cartItem: CartItem; 
  handleRemove: (itemId: number) => void; 
}

const CartView: React.FC<CartViewProps> = ({ cartItem, handleRemove }) => {
  const dispatch = useDispatch();

  return ( 
    <ListItem 
      key={cartItem.id}
      sx={{ 
        display: 'flex',
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '10px 16px'
      }}
    >
      <ListItemIcon> 
        <Avatar src={cartItem.imageUrl} alt={cartItem.title} />
      </ListItemIcon> 

      <ListItemText 
        primary={cartItem.title} 
      />

      <Box> 
        {/* Display Price: */}
        <Typography variant="subtitle1" color="text.secondary"> 
          ${cartItem.price.toFixed(2)} {/* Format to two decimal places */} 
        </Typography>


      </Box>

      <IconButton 
        edge="end"
        aria-label="delete" 
        onClick={() => handleRemove(cartItem.id)}
      >
        {/* <DeleteIcon /> */}
      </IconButton>
    </ListItem> 
  );
};

export default CartView;