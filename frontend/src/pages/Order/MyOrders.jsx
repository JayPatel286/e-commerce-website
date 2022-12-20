import {
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { OpenInNew } from '@mui/icons-material';
import { getMyOrders } from '../../actions/orderActions';
import MetaData from '../../components/MetaData';

const MyOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, orders, error } = useSelector((state) => state.myOrders);

  const dispatch = useDispatch();
  const alert = useAlert();

  const columns = [
    {
      field: 'id',
      headerName: 'Order ID',
      flex: 0.8,
      cellClassName: 'blue',
    },
    {
      field: 'date',
      headerName: 'Order Date',
      flex: 0.7,
    },
    {
      field: 'items',
      headerName: 'Items',
      flex: 0.9,
      sortable: false,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 0.4,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.4,
      sortable: false,
      cellClassName: (params) => {
        return params.getValue(params.id, 'status') === 'Delivered'
          ? 'green'
          : 'yellow';
      },
      renderCell: (params) => {
        return (
          <Chip
            label={params.getValue(params.id, 'status')}
            size="small"
            variant="outlined"
            color={
              params.getValue(params.id, 'status') === 'Delivered'
                ? 'success'
                : params.getValue(params.id, 'status') === 'Shipped'
                ? 'info'
                : 'warning'
            }
          />
        );
      },
    },
    {
      flex: 0.2,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, 'id')}`}>
            <IconButton color="primary">
              <OpenInNew />
            </IconButton>
          </Link>
        );
      },
    },
  ];

  const rows = [];
  orders &&
    orders.forEach((order, index) => {
      let items = '';
      order.orderItems.forEach((i) => {
        items += `${i.name} * ${i.quantity}, `;
      });
      items = items.slice(0, -2);

      rows.push({
        id: order._id,
        date: moment(order.createdAt).format('MMMM Do YYYY'),
        items: items,
        amount: `₹ ${order.totalPrice.toLocaleString()}`,
        status: order.orderStatus,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    dispatch(getMyOrders());
  }, [error, alert, dispatch]);

  return (
    <>
      {loading ? (
        <Stack
          sx={{ minHeight: '90vh' }}
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
        </Stack>
      ) : (
        <Container sx={{ marginTop: '40px', minHeight: '81vh' }}>
          <MetaData title={`${user.name}'s Orders`} />

          <Typography variant="subtitle2" fontSize={20} mb={2}>
            {user.name}'s Orders
          </Typography>

          <Paper elevation={2}>
            <DataGrid
              columns={columns}
              rows={rows}
              pageSize={5}
              rowsPerPageOptions={[5]}
              autoHeight
              disableSelectionOnClick
            />
          </Paper>
        </Container>
      )}
    </>
  );
};

export default MyOrders;
