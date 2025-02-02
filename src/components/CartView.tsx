
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Box,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { CartItem } from '../store/CartItem';
import { useDispatch } from 'react-redux';
import { updateQuantity } from '../store/cartSlice';

interface CartViewProps {
  cartItem: CartItem;
  handleRemove: (itemId: number) => void;
}

const CartView: React.FC<CartViewProps> = ({ cartItem, handleRemove }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value, 10);
    if (quantity > 0) {
      dispatch(updateQuantity({ id: cartItem.id, quantity }));
    }
  };

  return (
    <ListItem
      key={cartItem.id}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        padding: '10px 16px',
        flexDirection: 'row',
      }}
    >
    <ListItemIcon>
      <Avatar src={cartItem.imageUrl} alt={cartItem.title} sx={{ width: 60, height: 60 }} />
    </ListItemIcon>
      <Box sx={{ display: 'flex', alignItems: 'start', flexDirection: 'column' }}>

        <ListItemText
          primary={cartItem.title}
         sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: '1.2rem' }}
        />

      <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
        <Typography variant="subtitle1" color="text.secondary">
          ${cartItem.price.toFixed(2)}
        </Typography>


        <Typography variant="subtitle1" color="text.secondary" sx={{ marginLeft: '16px' }}>
            ({cartItem.quantity})
        </Typography>

        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => handleRemove(cartItem.id)}
        >
          <Typography variant="body1">Remove</Typography>
        </IconButton>
      </Box>
      </Box>
    </ListItem>
  );
};

export default CartView;