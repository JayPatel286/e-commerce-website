import {
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useEffect } from 'react';
import { clearErrors } from '../../actions/orderActions';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { deleteOrder, getAllOrders } from '../../actions/orderActions';
import moment from 'moment';
import MetaData from '../../components/MetaData';
import Sidebar from '../../components/Admin/Sidebar';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';

const AdminOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {
    loading,
    error,
    orders,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.adminOrders);

  const handleDelete = (id) => {
    dispatch(deleteOrder(id));
  };

  const columns = [
    {
      field: 'id',
      headerName: 'Order ID',
      flex: 0.3,
      cellClassName: 'blue',
    },
    {
      field: 'customer',
      headerName: 'Customer',
      flex: 0.4,
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
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/order/${params.getValue(params.id, 'id')}`}>
              <IconButton color="primary">
                <Edit />
              </IconButton>
            </Link>
            <IconButton
              color="error"
              onClick={() => handleDelete(params.getValue(params.id, 'id'))}
            >
              <Delete />
            </IconButton>
          </>
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
        customer: order.user.name,
        date: moment(order.createdAt).format('MMMM Do YYYY'),
        items: items,
        amount: `₹ ${order.totalPrice.toLocaleString()}`,
        status: order.orderStatus,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success('Order deleted successfully');
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [error, alert, dispatch, deleteError, isDeleted]);

  return (
    <>
      <MetaData title="Admin Dashboard" />
      <Stack direction="row" gap={1} mt={1}>
        <Sidebar tab="orders" />

        <Stack flex={4}>
          <Paper sx={{ minHeight: '90vh', padding: '20px' }}>
            <Typography variant="subtitle2" fontSize={22} mb={1}>
              Order Details
            </Typography>

            <Typography variant="subtitle2" fontSize={14} my={1} color="gray">
              In the order details section, you can review and manage all orders
              with their details. You can view and edit many information such as
              order status. Access to this area is limited. Only admins can
              reach.
            </Typography>

            {loading ? (
              <Stack
                sx={{ minHeight: '50%' }}
                alignItems="center"
                justifyContent="center"
              >
                <CircularProgress />
              </Stack>
            ) : (
              <DataGrid
                sx={{ marginTop: '20px' }}
                rows={rows}
                rowsPerPageOptions={[8]}
                // getRowHeight={() => 'auto'}
                columns={columns}
                pageSize={8}
                disableSelectionOnClick
                autoHeight
              />
            )}
          </Paper>
        </Stack>
      </Stack>
    </>
  );
};

export default AdminOrders;
