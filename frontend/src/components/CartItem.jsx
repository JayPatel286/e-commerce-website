import { Add, Remove } from '@mui/icons-material';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItemsToCart, removeFromCart } from '../actions/cartActions';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const increaseQuantity = (id, quantity, stock) => {
    const newQuantity = quantity + 1;
    if (newQuantity > stock) {
      alert.error('Quantity out of stock');
      return;
    }

    dispatch(addItemsToCart(id, newQuantity));
    alert.success(`You have changed ${item.name}'s quantity to ${newQuantity}`);
  };

  const decreaseQuantity = (id, quantity) => {
    const newQuantity = quantity - 1;
    if (newQuantity < 1) {
      alert.error('Quantity must be greater than 0');
      return;
    }

    dispatch(addItemsToCart(id, newQuantity));
    alert.success(`You have changed ${item.name}'s quantity to ${newQuantity}`);
  };

  return (
    <Stack direction="row" gap={5} pr={3}>
      <Link to={`/product/${item.product}`}>
        <img
          src={item.image}
          alt={item.name}
          width={150}
          height={150}
          style={{ objectFit: 'contain' }}
        />
      </Link>

      <Stack direction="row" flex="1" justifyContent="space-between">
        <Stack gap={1}>
          <Link to={`/product/${item.product}`}>
            <Typography variant="h6">{item.name}</Typography>
          </Link>

          <Typography variant="subtitle2" color="darkgoldenrod">
            ₹ {item.price.toLocaleString()}
          </Typography>

          <Stack direction="row" alignItems="center" mt={1}>
            <IconButton
              size="small"
              color="primary"
              style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
              onClick={() => decreaseQuantity(item.product, item.quantity)}
            >
              <Remove fontSize="small" />
            </IconButton>
            <input
              type="number"
              readOnly
              value={item.quantity}
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                width: '40px',
                textAlign: 'center',
                fontSize: '18px',
              }}
            />
            <IconButton
              size="small"
              color="primary"
              style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
              onClick={() =>
                increaseQuantity(item.product, item.quantity, item.stock)
              }
            >
              <Add fontSize="small" />
            </IconButton>
          </Stack>

          <Button
            sx={{ width: 'max-content', textTransform: 'capitalize' }}
            color="error"
            onClick={() => dispatch(removeFromCart(item.product))}
          >
            Remove
          </Button>
        </Stack>

        <Typography variant="h6" color="green">
          ₹ {Number(item.price * item.quantity).toLocaleString()}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default CartItem;
