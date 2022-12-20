import { Delete } from '@mui/icons-material';
import {
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../actions/cartActions';

const OrderSummery = ({ cartItems }) => {
  const dispatch = useDispatch();

  const getSubtotal = () => {
    let total = 0;

    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });

    return total;
  };
  const discount = 500;
  const deliveryCharge = getSubtotal() > 1000 ? 0 : 40;
  const tax = getSubtotal() * 0.05;

  const getTotalPrice = () => {
    return getSubtotal() + deliveryCharge + tax - discount;
  };

  return (
    <Paper sx={{ padding: '20px' }}>
      {cartItems.length === 0 ? (
        <Stack justifyContent="center" alignItems="center" height={150}>
          <Typography variant="subtitle2" fontSize={18} mb={3}>
            Cart is Empty
          </Typography>

          <Link to="/products/">
            <Button variant="contained">Start Shopping</Button>
          </Link>
        </Stack>
      ) : (
        <Stack gap={2}>
          <Typography variant="subtitle2" fontSize={18}>
            Order Summery
          </Typography>

          <Stack mt={1} gap={3}>
            {cartItems &&
              cartItems.map((item) => (
                <Stack key={item.product} direction="row" gap={1}>
                  <Link to={`/product/${item.product}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      style={{ objectFit: 'contain' }}
                    />
                  </Link>

                  <Stack justifyContent="space-between" flex={1}>
                    <Stack
                      direction="row"
                      sx={{ width: '100%' }}
                      alignItems="flex-start"
                      justifyContent="space-between"
                    >
                      <Stack>
                        <Link to={`/product/${item.product}`}>
                          <Typography variant="subtitle2" fontSize={16}>
                            {item.name}
                          </Typography>
                        </Link>
                        <Typography
                          variant="subtitle2"
                          fontSize={14}
                          color="green"
                        >
                          ₹ {item.price.toLocaleString()}
                        </Typography>
                      </Stack>

                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => dispatch(removeFromCart(item.product))}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Stack>

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-end"
                    >
                      <Typography variant="subtitle2" fontSize={12}>
                        &times;{item.quantity}
                      </Typography>
                      <Typography variant="subtitle2" fontSize={14}>
                        ₹ {Number(item.quantity * item.price).toLocaleString()}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              ))}
          </Stack>
          <Divider />

          <Stack gap={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle2">Subtotal</Typography>
              <Typography variant="subtitle2">
                ₹ {getSubtotal().toLocaleString()}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle2">Discount</Typography>
              <Typography variant="subtitle2" color="green">
                - ₹ {Number(discount).toLocaleString()}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle2">Delivery Charge</Typography>
              <Typography variant="subtitle2">
                ₹ {Number(deliveryCharge).toLocaleString()}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle2">GST (5%)</Typography>
              <Typography variant="subtitle2">
                ₹ {tax.toLocaleString()}
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
          </Stack>
        </Stack>
      )}
    </Paper>
  );
};

export default OrderSummery;
