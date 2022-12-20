import {
  CircularProgress,
  Container,
  List,
  ListItemButton,
  ListItemText,
  Pagination,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors, getProducts } from '../../actions/productActions';
import MetaData from '../../components/MetaData';
import Product from '../../components/Product';

const categories = [
  'All',
  'Laptop',
  'Footwear',
  'Bottom',
  'Tops',
  'Attire',
  'Camera',
  'Mobile',
];

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 100000]);
  const [category, setCategory] = useState('All');
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const alert = useAlert();

  const {
    products,
    loading,
    error,
    productsCount,
    resultsPerPage,
    filteredCount,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [dispatch, keyword, error, alert, currentPage, price, category, rating]);

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  const count = filteredCount;

  return (
    <Container sx={{ marginTop: '40px', minHeight: '90vh' }}>
      <MetaData title="Products Page" />
      <Typography variant="h4" textAlign={'center'}>
        Products
      </Typography>

      {/* Filters */}
      <Stack direction="row" mt={5} gap={3}>
        <Stack flex={1}>
          <Typography variant="subtitle2">Price</Typography>
          <Slider
            value={price}
            onChange={priceHandler}
            min={0}
            max={100000}
            disableSwap
            step={5000}
            size="small"
            valueLabelDisplay="auto"
          />

          <Typography variant="subtitle2">Categories</Typography>
          <List orientation="vertical" color="primary" dense>
            {categories.map((cat) => (
              <ListItemButton
                key={cat}
                sx={{
                  borderRadius: '5px',
                }}
                onClick={(e) => setCategory(cat)}
                selected={category === cat}
              >
                <ListItemText primary={cat} sx={{ fontSize: '10px' }} />
              </ListItemButton>
            ))}
          </List>

          <Typography variant="subtitle2" component="legend" mb={1}>
            Ratings Above
          </Typography>
          <Slider
            value={rating}
            onChange={(e, newRating) => setRating(newRating)}
            size="small"
            step={1}
            marks
            min={0}
            max={5}
            valueLabelDisplay="auto"
          />
        </Stack>

        <Stack flex={4} alignItems="center" gap={5}>
          {loading ? (
            <CircularProgress sx={{ margin: '50px auto 0' }} />
          ) : (
            <>
              <Stack
                direction="row"
                gap={4}
                justifyContent="center"
                flexWrap="wrap"
              >
                {products &&
                  products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
              </Stack>

              {resultsPerPage < count && (
                <Pagination
                  count={Math.ceil(productsCount / resultsPerPage)}
                  page={currentPage}
                  onChange={(e, value) => setCurrentPage(value)}
                />
              )}
            </>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default Products;
