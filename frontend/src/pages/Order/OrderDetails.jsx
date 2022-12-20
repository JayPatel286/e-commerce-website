import { CreditCard, NavigateNext } from '@mui/icons-material';
import {
  Box,
  Breadcrumbs,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { getOrderDetails } from '../../actions/orderActions';
import MetaData from '../../components/MetaData';

const OrderDetails = () => {
  const { id } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { order, error, loading } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    dispatch(getOrderDetails(id));
  }, [error, alert, dispatch, id]);

  const addDaysToDate = (date, days) => {
    const dt = new Date(date);
    dt.setDate(dt.getDate() + days);

    return dt;
  };

  return (
    <>
      {loading ? (
        <Stack
          sx={{ minHeight: '85vh' }}
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
        </Stack>
      ) : (
        <Container sx={{ marginTop: '40px', minHeight: '81vh' }}>
          <MetaData title={`Order: ${id}`} />
          <Paper elevation={2} sx={{ padding: '20px' }}>
            <Stack direction="row" justifyContent="space-between">
              {/* Link to go back */}
              <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
                <Link to="/orders">Orders</Link>
                <Typography variant="subtitle2">ID: {order._id}</Typography>
              </Breadcrumbs>
              <Chip
                variant="outlined"
                size="small"
                label={order && order.orderStatus}
                color={
                  order.orderStatus === 'Delivered' ? 'success' : 'warning'
                }
              />
            </Stack>

            <Typography variant="subtitle2" fontSize={20} mt={2}>
              Order ID: {order._id}
            </Typography>

            <Stack direction="row" gap={1} mt={1}>
              <Typography variant="subtitle2" color="gray">
                Order date:
              </Typography>
              <Typography variant="subtitle2" color="GrayText">
                {moment(order.createdAt).format('MMMM Do YYYY')}
              </Typography>
              <Typography variant="subtitle2" color="green" ml={2}>
                {order.orderStatus === 'Delivered'
                  ? 'Order Delivered'
                  : `Estimated Delivery:
                ${moment(addDaysToDate(order.createdAt, 3)).format(
                  'MMMM Do YYYY'
                )}`}
              </Typography>
            </Stack>

            <Stack direction="row" mt={2}>
              <Stack flex={2}>
                <Typography variant="subtitle2">Order Items</Typography>

                <Stack mt={2} gap={1}>
                  {order.orderItems &&
                    order.orderItems.map((item) => (
                      <Stack
                        direction="row"
                        key={item.product}
                        flex={1}
                        gap={3}
                      >
                        <Box
                          component="span"
                          sx={{
                            p: 1,
                            border: '1px solid #ececec',
                            borderRadius: '10px',
                            backgroundColor: '#f7f7f7',
                          }}
                        >
                          <Link to={`/product/${item.product}`}>
                            <img
                              src={item.image}
                              alt={item.name}
                              width={80}
                              height={80}
                              style={{ objectFit: 'contain' }}
                            />
                          </Link>
                        </Box>

                        <Stack direction="row" gap={40}>
                          <Stack>
                            <Link to={`/product/${item.product}`}>
                              <Typography variant="subtitle2" fontSize={18}>
                                {item.name}
                              </Typography>
                            </Link>
                          </Stack>
                          <Stack alignItems="flex-end" gap={1}>
                            <Typography variant="subtitle2" fontSize={18}>
                              ₹ {item.price.toLocaleString()}
                            </Typography>
                            <Typography variant="subtitle2" color="gray">
                              Qty: {item.quantity}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    ))}
                </Stack>
              </Stack>

              {/* Order Summery */}
              <Stack flex={1} mr={3}>
                <Typography variant="subtitle2" fontSize={18}>
                  Order Summery
                </Typography>

                <Stack gap={1} mt={2}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    color="GrayText"
                  >
                    <Typography variant="subtitle2" fontSize={18}>
                      Subtotal:
                    </Typography>
                    <Typography variant="subtitle2" fontSize={18}>
                      ₹ {order.itemsPrice && order.itemsPrice.toLocaleString()}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    color="gray"
                  >
                    <Typography variant="subtitle1" fontSize={16}>
                      Delivery Charge:
                    </Typography>
                    <Typography variant="subtitle1" fontSize={16}>
                      {order.shippingPrice &&
                        order.shippingPrice.toLocaleString()}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    color="gray"
                  >
                    <Typography variant="subtitle1" fontSize={16}>
                      Tax:
                    </Typography>
                    <Typography variant="subtitle1" fontSize={16}>
                      ₹ {order.taxPrice && order.taxPrice.toLocaleString()}
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography
                      variant="subtitle2"
                      fontSize={18}
                      color="GrayText"
                    >
                      Total:
                    </Typography>
                    <Typography variant="subtitle2" fontSize={19}>
                      ₹ {order.totalPrice && order.totalPrice.toLocaleString()}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>

            <Divider sx={{ margin: '20px 0' }} />

            <Stack direction="row" gap={30}>
              <Stack gap={2}>
                <Typography variant="subtitle2" fontSize={18}>
                  Payment
                </Typography>
                <Stack direction="row" gap={1}>
                  <Typography variant="subtitle2" color="GrayText">
                    Payment Via:
                  </Typography>
                  <CreditCard color="action" />
                  <Typography variant="subtitle2">Card</Typography>
                </Stack>
                <Stack direction="row" gap={1}>
                  <Typography variant="subtitle2" color="GrayText">
                    Payment ID:
                  </Typography>
                  <Typography variant="subtitle2">
                    {order.paymentInfo && order.paymentInfo.id}
                  </Typography>
                </Stack>
              </Stack>
              <Stack gap={2}>
                <Typography variant="subtitle2" fontSize={18}>
                  Delivery
                </Typography>

                <Stack>
                  <Typography
                    variant="subtitle2"
                    color="lightslategray"
                    fontSize={12}
                  >
                    Address
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    fontSize={16}
                    color="GrayText"
                  >
                    {order.shippingInfo && order.shippingInfo.address}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    fontSize={16}
                    color="GrayText"
                  >
                    {order.shippingInfo && order.shippingInfo.state},{' '}
                    {order.shippingInfo && order.shippingInfo.country}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    fontSize={16}
                    color="GrayText"
                  >
                    {order.shippingInfo && order.shippingInfo.pinCode}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Paper>
        </Container>
      )}
    </>
  );
};

export default OrderDetails;
