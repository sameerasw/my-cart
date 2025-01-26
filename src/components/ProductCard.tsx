import { Button, Grid, Card, CardContent, Typography, CardMedia, Box } from '@mui/material';
import { EventItem } from '../types/Item';
import { useDispatch } from 'react-redux'; 
import { addToCart } from '../store/cartSlice'; 

interface ProductCardProps {
  product: EventItem; 
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, eventName, image, ticketPrice, availableTickets } = product; 
  const dispatch = useDispatch();

  const handleAddToCart = () => { 
    dispatch(addToCart({
      id, 
      title: eventName,
      imageUrl: image,
      price: ticketPrice,
      quantity: 1
    })); 
  }; 

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}> 
      <Card> 
        <CardMedia 
          component="img" 
          height="140" 
          image={image}
          alt={eventName}
          sx={{ objectFit: "cover" }}
        />
        <CardContent> 
          <Typography gutterBottom variant="h5" component="div"> 
            {eventName} 
          </Typography>
          <Typography variant="body2"> 
            Price: ${ticketPrice} 
          </Typography> 
          <Typography variant="body2"> 
            Available Tickets: {availableTickets}
          </Typography> 
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button variant="contained" onClick={handleAddToCart}>
              Add to Cart
            </Button> 
          </Box>
        </CardContent> 
      </Card> 
    </Grid> 
  );
}; 

export default ProductCard;