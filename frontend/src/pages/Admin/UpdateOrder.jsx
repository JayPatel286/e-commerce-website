import {
  Apartment,
  CreditCard,
  LocalShipping,
  NavigateNext,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Breadcrumbs,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getOrderDetails, updateOrder } from '../../actions/orderActions';
import Sidebar from '../../components/Admin/Sidebar';
import MetaData from '../../components/MetaData';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';

const UpdateOrder = () => {
  const [status, setStatus] = useState('');

  const dispatch = useDispatch();
  const alert = useAlert();

  const { id } = useParams();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.adminOrders
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    if (updateError) {
      alert.error(updateError);
    }

    if (isUpdated) {
      alert.success('Status updated successfully');
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [error, alert, dispatch, id, isUpdated, updateError]);

  const addDaysToDate = (date, days) => {
    const dt = new Date(date);
    dt.setDate(dt.getDate() + days);

    return dt;
  };

  const handleSubmit = () => {
    const updateData = {
      status,
    };

    dispatch(updateOrder(id, updateData));
    setStatus('');
  };

  return (
    <>
      <MetaData title="Update Order" />
      <Stack direction="row" gap={1} mt={1}>
        <Sidebar tab="orders" />

        <Stack flex={4}>
          <Paper sx={{ minHeight: '90vh', padding: '20px' }}>
            <Typography variant="subtitle2" fontSize={22} mb={2}>
              Edit Order
            </Typography>

            {loading ? (
              <Stack
                sx={{ minHeight: '60vh' }}
                alignItems="center"
                justifyContent="center"
              >
                <CircularProgress />
              </Stack>
            ) : (
              <>
                <Stack direction="row" justifyContent="space-between">
                  <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
                    <Link to="/admin/orders">Orders</Link>
                    <Typography variant="subtitle2">ID: {order._id}</Typography>
                  </Breadcrumbs>
                  <Chip
                    variant="outlined"
                    size="small"
                    label={order && order.orderStatus}
                    color={
                      order.orderStatus === 'Delivered'
                        ? 'success'
                        : order.orderStatus === 'Shipped'
                        ? 'info'
                        : 'warning'
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
                          ₹{' '}
                          {order.itemsPrice &&
                            order.itemsPrice.toLocaleString()}
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
                          ₹{' '}
                          {order.totalPrice &&
                            order.totalPrice.toLocaleString()}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>

                <Divider sx={{ margin: '20px 0' }} />

                <Stack direction="row" gap={20}>
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
                      Shipping Info
                    </Typography>

                    <Stack>
                      <Stack direction="row" gap={3} alignItems="center">
                        <Typography variant="subtitle2" color="lightslategray">
                          Name
                        </Typography>
                        <Typography variant="subtitle2" color="GrayText">
                          {order.user && order.user.name}
                        </Typography>
                      </Stack>

                      <Stack direction="row" gap={1} alignItems="flex-start">
                        <Typography variant="subtitle2" color="lightslategray">
                          Address
                        </Typography>
                        <Stack>
                          <Typography variant="subtitle2" color="GrayText">
                            {order.shippingInfo && order.shippingInfo.address}
                          </Typography>
                          <Typography variant="subtitle2" color="GrayText">
                            {order.shippingInfo && order.shippingInfo.state},{' '}
                            {order.shippingInfo && order.shippingInfo.country}
                          </Typography>
                          <Typography variant="subtitle2" color="GrayText">
                            {order.shippingInfo && order.shippingInfo.pinCode}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>

                  {order.orderStatus === 'Delivered' ? (
                    <Stack gap={2} alignItems="center">
                      <Stack direction="row" alignItems="flex-end">
                        <LocalShipping fontSize="small" color="success" />
                        <Apartment fontSize="large" color="success" />
                      </Stack>

                      <Typography
                        variant="subtitle2"
                        fontSize={18}
                        color="green"
                      >
                        Order has been delivered
                      </Typography>
                    </Stack>
                  ) : (
                    <Stack gap={2} flex={1}>
                      <Typography variant="subtitle2" fontSize={18}>
                        Process Order
                      </Typography>

                      <FormControl fullWidth>
                        {/* <InputLabel>Status</InputLabel> */}
                        <Select
                          required
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          size="small"
                        >
                          <MenuItem value="">
                            <em>Select Status</em>
                          </MenuItem>
                          {order && order.orderStatus === 'Processing' && (
                            <MenuItem value="Shipped">Shipped</MenuItem>
                          )}
                          {order && order.orderStatus === 'Shipped' && (
                            <MenuItem value="Delivered">Delivered</MenuItem>
                          )}
                        </Select>
                        <FormHelperText>Change Order Status</FormHelperText>
                      </FormControl>

                      <LoadingButton
                        loading={loading}
                        onClick={handleSubmit}
                        sx={{
                          width: 'fit-content',
                          marginLeft: 'auto',
                          marginTop: '10px',
                        }}
                        variant="contained"
                        disabled={status === '' ? true : false}
                      >
                        Process
                      </LoadingButton>
                    </Stack>
                  )}
                </Stack>
              </>
            )}
          </Paper>
        </Stack>
      </Stack>
    </>
  );
};

export default UpdateOrder;
