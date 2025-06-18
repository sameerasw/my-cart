import { Card, CardContent, Typography, CardMedia, Box, Rating, Chip } from '@mui/material';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { productName, image, productPrice, avgRating, vendorName } = product;

  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: "pointer",
        maxWidth: 320,
        height: 420,
        display: 'flex',
        flexDirection: 'column',
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
        },
        '&:hover .card-image': {
          transform: 'scale(1.05)',
        }
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="240"
          image={image}
          alt={productName}
          className="card-image"
          sx={{
            objectFit: "cover",
            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 2,
            px: 1.5,
            py: 0.5,
            backdropFilter: 'blur(8px)',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
            ${productPrice}
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        p: 3,
        '&:last-child': { pb: 3 }
      }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontWeight: 600,
            lineHeight: 1.3,
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {productName}
        </Typography>

        <Chip
          label={vendorName}
          size="small"
          sx={{
            alignSelf: 'flex-start',
            mb: 2,
            bgcolor: 'grey.100',
            color: 'text.secondary',
            fontWeight: 500,
          }}
        />

        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating
                value={avgRating}
                readOnly
                precision={0.5}
                size="small"
                sx={{ mr: 1 }}
              />
              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                ({avgRating.toFixed(1)})
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;