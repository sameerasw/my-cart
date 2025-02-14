import { Card, CardContent, Typography, CardMedia, Box, Rating } from '@mui/material';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { productName, image, productPrice, avgRating } = product;

  return (
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
          alt={productName}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {productName}
          </Typography>
          <Typography variant="body2">
            Price: ${productPrice}
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
  );
};

export default ProductCard;