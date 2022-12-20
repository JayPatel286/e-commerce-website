import { CurrencyRupee, Inventory, ListAlt, Person } from '@mui/icons-material';
import { Chip, Paper, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors, getAdminProducts } from '../../actions/productActions';
import { getAllOrders } from '../../actions/orderActions';
import Sidebar from '../../components/Admin/Sidebar';
import MetaData from '../../components/MetaData';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { CLEAR_ERRORS } from '../../constants/orderConstants';
import { getAllUsers } from '../../actions/userActions';
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';

const Dashboard = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { error, products } = useSelector((state) => state.products);
  const {
    error: orderError,
    orders,
    totalAmount,
  } = useSelector((state) => state.adminOrders);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  const dougnutState = {
    datasets: [
      {
        data: [outOfStock, products.length - outOfStock],
        backgroundColor: ['#9b27b0d9', '#003171'],
        hoverBackgroundColor: ['#9b27b0ca', '#003171db'],
      },
    ],
    labels: ['Out of Stock', 'In Stock'],
  };

  const columns = [
    {
      field: 'id',
      headerName: 'Order ID',
      flex: 0.5,
      cellClassName: 'blue',
    },
    {
      field: 'date',
      headerName: 'Order Date',
      flex: 0.4,
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
        date: moment(order.createdAt).format('ll'),
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
    if (orderError) {
      alert.error(orderError);
      dispatch({ type: CLEAR_ERRORS });
    }

    dispatch(getAllUsers());
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
  }, [error, alert, dispatch, orderError]);

  return (
    <>
      <MetaData title="Admin Dashboard" />
      <Stack direction="row" gap={1} mt={1}>
        <Sidebar tab="dashboard" />

        <Stack flex={4}>
          <Paper sx={{ minHeight: '90vh', padding: '20px' }}>
            <Typography variant="subtitle2">Welcome to Dashboard</Typography>
            <Typography variant="subtitle2" fontSize="25px" mt={0.5}>
              Hello, {user.name}
            </Typography>

            <Stack direction="row" gap={2} mt={1}>
              <Paper
                sx={{
                  flex: 1,
                  padding: '10px',
                }}
                elevation={3}
              >
                <Stack
                  direction="row"
                  alignItems="flex-end"
                  justifyContent="space-between"
                >
                  <Stack justifyContent="space-between" gap={2}>
                    <Typography variant="subtitle2" fontSize={20} color="gray">
                      Users
                    </Typography>
                    <Typography variant="subtitle2" fontSize={25}>
                      {users && users.length}
                    </Typography>
                    <Link to={'/admin/users'}>
                      <Typography
                        variant="subtitle2"
                        fontSize={13}
                        color="gray"
                      >
                        See all users
                      </Typography>
                    </Link>
                  </Stack>

                  <Paper
                    sx={{
                      padding: 0.8,
                      paddingBottom: 0.2,
                      backgroundColor: '#9b27b0d9',
                    }}
                    // 04c9b9c6
                  >
                    <Person sx={{ color: '#fff' }} />
                  </Paper>
                </Stack>
              </Paper>
              <Paper
                sx={{
                  flex: 1,
                  padding: '10px',
                }}
                elevation={3}
              >
                <Stack
                  direction="row"
                  alignItems="flex-end"
                  justifyContent="space-between"
                >
                  <Stack justifyContent="space-between" gap={2}>
                    <Typography variant="subtitle2" fontSize={20} color="gray">
                      Products
                    </Typography>
                    <Typography variant="subtitle2" fontSize={25}>
                      {products && products.length}
                    </Typography>
                    <Link to={'/admin/products'}>
                      <Typography
                        variant="subtitle2"
                        fontSize={13}
                        color="gray"
                      >
                        See all products
                      </Typography>
                    </Link>
                  </Stack>

                  <Paper
                    sx={{
                      padding: 0.8,
                      paddingBottom: 0.2,
                      backgroundColor: '#9b27b0d9',
                    }}
                  >
                    <Inventory sx={{ color: '#fff' }} />
                  </Paper>
                </Stack>
              </Paper>
              <Paper
                sx={{
                  flex: 1,
                  padding: '10px',
                }}
                elevation={3}
              >
                <Stack
                  direction="row"
                  alignItems="flex-end"
                  justifyContent="space-between"
                >
                  <Stack justifyContent="space-between" gap={2}>
                    <Typography variant="subtitle2" fontSize={20} color="gray">
                      Orders
                    </Typography>
                    <Typography variant="subtitle2" fontSize={25}>
                      {orders && orders.length}
                    </Typography>
                    <Link to={'/admin/orders'}>
                      <Typography
                        variant="subtitle2"
                        fontSize={13}
                        color="gray"
                      >
                        See all orders
                      </Typography>
                    </Link>
                  </Stack>

                  <Paper
                    sx={{
                      padding: 0.8,
                      paddingBottom: 0.2,
                      backgroundColor: '#9b27b0d9',
                    }}
                  >
                    <ListAlt sx={{ color: '#fff' }} />
                  </Paper>
                </Stack>
              </Paper>
              <Paper
                sx={{
                  flex: 1,
                  padding: '10px',
                }}
                elevation={3}
              >
                <Stack
                  direction="row"
                  alignItems="flex-end"
                  justifyContent="space-between"
                >
                  <Stack justifyContent="space-between" gap={2}>
                    <Typography variant="subtitle2" fontSize={20} color="gray">
                      Balance
                    </Typography>
                    <Typography variant="subtitle2" fontSize={25}>
                      ₹{totalAmount && totalAmount.toLocaleString()}
                    </Typography>
                    <Typography variant="subtitle2" fontSize={13} color="gray">
                      Till date
                    </Typography>
                  </Stack>

                  <Paper
                    sx={{
                      padding: 0.8,
                      paddingBottom: 0.2,
                      backgroundColor: '#9b27b0d9',
                    }}
                  >
                    <CurrencyRupee sx={{ color: '#fff' }} />
                  </Paper>
                </Stack>
              </Paper>
            </Stack>

            <Stack direction="row" gap={2} mt={0.5}>
              <Paper
                sx={{ marginTop: '20px', width: '500px', padding: '10px' }}
                elevation={2}
              >
                <Typography variant="subtitle2" mb={2}>
                  Stock of Products
                </Typography>
                <Doughnut
                  data={dougnutState}
                  options={{
                    legend: {
                      display: true,
                    },
                    responsive: true,
                    maintainAspectRatio: true,
                  }}
                />
              </Paper>
              <Paper
                sx={{ marginTop: '20px', width: '100%', padding: '10px' }}
                elevation={2}
              >
                <Typography variant="subtitle2">Latest Orders</Typography>
                <DataGrid
                  sx={{ marginTop: '10px' }}
                  rows={rows.slice(0, 5)}
                  rowsPerPageOptions={[5]}
                  columns={columns}
                  pageSize={5}
                  disableSelectionOnClick
                  autoHeight
                />
              </Paper>
            </Stack>
          </Paper>
        </Stack>
      </Stack>
    </>
  );
};

export default Dashboard;
