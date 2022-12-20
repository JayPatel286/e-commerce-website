import {
  Dashboard,
  Inventory,
  ListAlt,
  PeopleAlt,
  Reviews,
} from '@mui/icons-material';
import {
  Avatar,
  List,
  ListItemButton,
  ListItemIcon,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = ({ tab }) => {
  // const [tab, setTab] = useState('dashboard');
  const [open, setOpen] = useState(false);

  const { user } = useSelector((state) => state.user);

  return (
    <Stack flex={1}>
      <Paper sx={{ minHeight: '100%', padding: '10px' }}>
        <Stack direction="row" gap={2} alignItems="center" pl={2} mt={1}>
          <Avatar src={user && user.avatar.url} alt={user && user.name} />

          <Stack>
            <Typography variant="subtitle2">{user && user.name}</Typography>
            <Typography variant="subtitle2" fontSize={12} color="GrayText">
              {user && user.email}
            </Typography>
          </Stack>
        </Stack>

        <List
          orientation="vertical"
          // dense
          component="nav"
          sx={{
            marginTop: '10px',
            '&& .Mui-selected, && .Mui-selected:hover': {
              bgcolor: '#EDF4FB',
              '&, & .MuiListItemIcon-root': {
                // color: '#9b27b0d9',
                color: '#003171',
              },
            },
            '&& .MuiListItemButton-root:hover': {
              // bgcolor: 'rgb(223, 55, 252, 0.1)',
              bgcolor: '#edf4fbb7',
            },
            '& .MuiListItemButton-root': {
              color: '#000',
            },
          }}
        >
          <Link to={'/admin/dashboard'}>
            <ListItemButton
              sx={{
                borderRadius: '5px',
                marginBottom: '5px',
              }}
              selected={tab === 'dashboard'}
              // onClick={() => setTab('dashboard')}
            >
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              {/* <ListItemText primary="Dashboard" sx={{ fontSize: '10px' }} /> */}
              <Typography variant={tab === 'dashboard' ? 'subtitle2' : 'body2'}>
                Dashboard
              </Typography>
            </ListItemButton>
          </Link>

          <Link to={'/admin/products'}>
            <ListItemButton
              sx={{
                borderRadius: '5px',
                marginBottom: '5px',
              }}
              selected={tab === 'products'}
              onClick={() => {
                setOpen(!open);
                // setTab('products');
              }}
            >
              <ListItemIcon>
                <Inventory />
              </ListItemIcon>
              {/* <ListItemText primary="Products" sx={{ fontSize: '10px' }} /> */}
              <Typography variant={tab === 'products' ? 'subtitle2' : 'body2'}>
                Products
              </Typography>
              {/* <ListItemIcon>
                {open ? <ArrowDropDown /> : <ArrowDropUp />}
              </ListItemIcon> */}
            </ListItemButton>
          </Link>

          <Link to={'/admin/orders'}>
            <ListItemButton
              sx={{
                borderRadius: '5px',
                marginBottom: '5px',
              }}
              selected={tab === 'orders'}
              // onClick={() => setTab('orders')}
            >
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              {/* <ListItemText primary="Orders" sx={{ fontSize: '10px' }} /> */}
              <Typography variant={tab === 'orders' ? 'subtitle2' : 'body2'}>
                Orders
              </Typography>
            </ListItemButton>
          </Link>

          <Link to={'/admin/users'}>
            <ListItemButton
              sx={{
                borderRadius: '5px',
                marginBottom: '5px',
              }}
              selected={tab === 'users'}
              // onClick={() => setTab('users')}
            >
              <ListItemIcon>
                <PeopleAlt />
              </ListItemIcon>
              {/* <ListItemText primary="Users" sx={{ fontSize: '10px' }} /> */}
              <Typography variant={tab === 'users' ? 'subtitle2' : 'body2'}>
                Users
              </Typography>
            </ListItemButton>
          </Link>

          <Link to={'/admin/reviews'}>
            <ListItemButton
              sx={{
                borderRadius: '5px',
                marginBottom: '5px',
              }}
              selected={tab === 'reviews'}
              // onClick={() => setTab('reviews')}
            >
              <ListItemIcon>
                <Reviews />
              </ListItemIcon>
              {/* <ListItemText primary="Reviews" sx={{ fontSize: '10px' }} /> */}
              <Typography variant={tab === 'reviews' ? 'subtitle2' : 'body2'}>
                Reviews
              </Typography>
            </ListItemButton>
          </Link>
        </List>
      </Paper>
    </Stack>
  );
};

export default Sidebar;
