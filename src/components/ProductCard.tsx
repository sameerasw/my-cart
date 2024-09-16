// ProductCard.tsx
import { Button, Grid, Card, CardContent, Typography, CardMedia, Box } from '@mui/material';
import { Product } from '../types/Product';
import { useDispatch } from 'react-redux'; 
import { addToCart } from '../store/cartSlice'; 

interface ProductCardProps {
  product: Product; 
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, title, imageUrl, price, rating, description } = product; 
  const dispatch = useDispatch();

  const handleAddToCart = () => { 
    dispatch(addToCart({
      id, 
      title,
      imageUrl,
      price, 
    })); 
  }; 

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}> 
      <Card> 
        <CardMedia 
          component="img" 
          height="140" 
          image={imageUrl}
          alt={title}
          sx={{ objectFit: "cover" }}
        />
        <CardContent> 
          <Typography gutterBottom variant="h5" component="div"> 
            {title} 
          </Typography>
          <Typography variant="body2"> 
            Price: ${price} 
          </Typography> 
          <Typography variant="body2"> 
            Ratings: {rating}/5
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