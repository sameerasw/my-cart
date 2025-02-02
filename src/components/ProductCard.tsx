import { Button, Grid, Card, CardContent, Typography, CardMedia, Box, Rating } from '@mui/material';
import { EventItem } from '../types/Item';
import { useDispatch } from 'react-redux'; 
import { addToCart } from '../store/cartSlice'; 

interface ProductCardProps {
  product: EventItem; 
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const { id, eventName, image, ticketPrice, availableTickets, avgRating } = product; 
  const dispatch = useDispatch();

  const handleAddToCart = () => { 
    dispatch(addToCart({
      id, 
      title: eventName,
      imageUrl: image,
      price: ticketPrice,
      quantity: 1
    })); 

    // save cart to local storage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const item = cart.find((item: any) => item.id === id);
    if (item) {
      item.quantity += 1;
    } else {
      cart.push({ id, title: eventName, imageUrl: image, price: ticketPrice, quantity: 1 });
    }
    console.log("Saving cart to local storage", cart);
    localStorage.setItem('cart', JSON.stringify(cart));
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
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Rating value={avgRating} readOnly precision={0.5} />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {avgRating.toFixed(1)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button variant="contained" onClick={onAddToCart}>
              Add to Cart
            </Button> 
          </Box>
        </CardContent> 
      </Card> 
    </Grid> 
  );
}; 

export default ProductCard;