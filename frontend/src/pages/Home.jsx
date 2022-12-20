import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import Hero from '../images/hero.png';
import { ShoppingBasket } from '@mui/icons-material';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors, getProducts } from '../actions/productActions';
import MetaData from '../components/MetaData';
import Product from '../components/Product';

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProducts());
  }, [dispatch, error, alert]);

  return (
    <>
      <MetaData title="E-Commerce Site" />
      <Container maxWidth="lg" sx={{ marginTop: 8 }}>
        <Stack direction="row" justifyContent="space-between" mb={6}>
          <Box mt={10}>
            <Typography variant="h2" letterSpacing={'5px'} fontWeight="bold">
              Every Purchase Will Be Made With Pleasure
            </Typography>
            <Typography variant="subtitle1" mt={2}>
              Buying and selling of goods or services using the internet.
            </Typography>

            <Link to={'/products'}>
              <Button
                sx={{ marginTop: 5 }}
                color="secondary"
                variant="contained"
                autoCapitalize="none"
                endIcon={<ShoppingBasket ml={2} />}
              >
                Start Shopping
              </Button>
            </Link>
          </Box>

          <Box>
            <img src={Hero} alt="Hero" width="500px" />
          </Box>
        </Stack>

        {/* Featured Products */}
        <Typography variant="h4" textAlign="center">
          Featured Products
        </Typography>

        {loading ? (
          <Stack
            sx={{ minHeight: '90vh' }}
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress />
          </Stack>
        ) : (
          <Stack direction="row" gap={4} mt={10} flexWrap="wrap">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </Stack>
        )}
      </Container>
    </>
  );
};

export default Home;
