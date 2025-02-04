import { Grid, Card, CardContent, Typography, CardMedia, Box, Rating } from '@mui/material';
import { EventItem } from '../types/Item';

interface ProductCardProps {
  product: EventItem; 
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { eventName, image, ticketPrice, availableTickets, avgRating } = product; 

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}> 
      <Card onClick={onClick} sx={{
        cursor: "pointer", 
        width: "25em",
        borderRadius: 2,
        transition: "all 0.2s ease-in-out",
        '&:hover': {
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
          scale: 1.05,
        }
      }}> 
        <CardMedia 
          component="img" 
          height="250em" 
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
          {/* <Typography variant="body2"> 
            Available Tickets: {availableTickets}
          </Typography>  */}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Rating value={avgRating} readOnly precision={0.5} />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {avgRating.toFixed(1)}
            </Typography>
          </Box>
        </CardContent> 
      </Card> 
    </Grid> 
  );
}; 

export default ProductCard;