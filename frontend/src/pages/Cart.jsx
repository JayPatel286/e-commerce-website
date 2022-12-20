import {
  GppGood,
  RemoveShoppingCart,
  ShoppingCartCheckout,
} from '@mui/icons-material';
import {
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import MetaData from '../components/MetaData';

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const discount = 500;

  const navigate = useNavigate();

  const getGrossTotal = () => {
    let total = 0;

    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });

    return total;
  };
  const deliveryCharge = getGrossTotal() > 1000 ? 0 : 40;

  const getTotalPrice = () => {
    return getGrossTotal() + deliveryCharge - discount;
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  return (
    <Container sx={{ marginTop: '25px', minHeight: '85vh' }}>
      <MetaData title={`My Cart`} />
      <Stack direction="row" gap={2}>
        <Stack flex={2}>
          <Paper sx={{ padding: '20px' }}>
            {cartItems.length === 0 ? (
              <Stack
                height="200px"
                gap={2}
                justifyContent="center"
                alignItems="center"
              >
                <RemoveShoppingCart fontSize="large" />
                <Typography variant="subtitle2" fontSize={18}>
                  Your Cart is Empty
                </Typography>
                <Typography variant="subtitle2" color="gray">
                  Add items to it now.
                </Typography>
                <Link to="/products">
                  <Button variant="contained">Shop Now</Button>
                </Link>
              </Stack>
            ) : (
              <Stack gap={3}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  px={2}
                  mb={2}
                >
                  <Typography variant="subtitle2" fontSize={18}>
                    Shopping Cart
                  </Typography>
                  <Typography variant="subtitle2" fontSize={18}>
                    {cartItems.length} items
                  </Typography>
                </Stack>
                {/* <Divider /> */}

                {cartItems.map((item, index) => (
                  <>
                    <CartItem item={item} key={item.product} />
                    {index !== cartItems.length - 1 && <Divider />}
                  </>
                ))}
              </Stack>
            )}
          </Paper>
        </Stack>


        {/* Total price of all cart items */}
        {cartItems.length > 0 && (
          <Stack flex={1}>
            <Paper sx={{ padding: '20px' }}>
              <Stack gap={2}>
                <Typography variant="subtitle2" color="gray" fontSize={16}>
                  Price Details
                </Typography>
                <Divider />

                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle2" fontSize={16}>
                    Price ({cartItems.length} item
                    {cartItems.length > 1 ? 's' : ''})
                  </Typography>
                  <Typography variant="subtitle2" fontSize={16}>
                    ₹ {getGrossTotal().toLocaleString()}
                  </Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle2" fontSize={16}>
                    Discount
                  </Typography>
                  <Typography variant="subtitle2" color="green" fontSize={16}>
                    - ₹ {Number(discount).toLocaleString()}
                  </Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle2" fontSize={16}>
                    Delivery Charges
                  </Typography>
                  <Typography variant="subtitle2" fontSize={16}>
                    ₹ {Number(deliveryCharge).toLocaleString()}
                  </Typography>
                </Stack>

                <Divider />

                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle2" fontSize={16}>
                    Total
                  </Typography>
                  <Typography variant="subtitle2" fontSize={16}>
                    ₹ {getTotalPrice().toLocaleString()}
                  </Typography>
                </Stack>

                <Button
                  startIcon={<ShoppingCartCheckout />}
                  variant="contained"
                  color="secondary"
                  sx={{ marginTop: 2 }}
                  onClick={checkoutHandler}
                >
                  Checkout
                </Button>
              </Stack>
            </Paper>

            <Stack direction="row" gap={1} mt={2} alignItems="center">
              <GppGood color="disabled" fontSize="large" />
              <Typography variant="subtitle2" color="gray">
                Safe and Secure Payments. Easy returns. 100% Authentic products.
              </Typography>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Container>
  );
};

export default Cart;
