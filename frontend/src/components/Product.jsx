import { Paper, Rating, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Product = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <motion.div whileHover={{ scale: [1, 1.01], translateY: '-10px' }}>
        <Paper sx={{ padding: '10px', width: '260px' }} elevation={3}>
          <img
            src={product.images[0].url}
            alt={product.name}
            style={{ borderRadius: '5px', objectFit: 'contain' }}
            width="100%"
            height="200px"
          />
          <Typography mt={2} variant="h6">
            {product.name}
          </Typography>

          <Stack direction="row">
            <Rating
              value={product.rating}
              precision={0.5}
              readOnly
              color="primary"
            />
            <Typography variant="subtitle2">
              ({product.numOfReviews} reviews)
            </Typography>
          </Stack>

          <Typography mt={1} variant="h6">
            ₹ {product.price.toLocaleString()}
          </Typography>
        </Paper>
      </motion.div>
    </Link>
  );
};

export default Product;
