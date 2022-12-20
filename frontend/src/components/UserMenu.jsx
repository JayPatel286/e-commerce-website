import { Dashboard, LocalMall, Logout } from '@mui/icons-material';
import {
  Avatar,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../actions/userActions';

const UserMenu = ({ user }) => {
  const [anchorEL, setAnchorEL] = useState(null);
  const open = Boolean(anchorEL);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    setAnchorEL(null);

    dispatch(logout());
  };

  return (
    <>
      <Tooltip title="Profile">
        {/* <IconButton
          sx={{ mx: 0.5 }}
          color="black"
          onClick={(e) => setAnchorEL(e.currentTarget)}
        > */}
        {/* <AccountCircle /> */}
        <Avatar
          sx={{ mx: 0.5, width: 35, height: 35, cursor: 'pointer' }}
          src={user.avatar && user.avatar.url}
          alt={user && user.name}
          onClick={(e) => setAnchorEL(e.currentTarget)}
        />
        {/* </IconButton> */}
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEL}
        open={open}
        onClose={() => setAnchorEL(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            width: '180px',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() => {
            navigate('/profile');
            setAnchorEL(null);
          }}
        >
          <Avatar
            src={user.avatar && user.avatar.url}
            alt={user && user.name}
          />
          <Typography variant="subtitle2">My Profile</Typography>
        </MenuItem>

        <Divider />

        {user.role === 'admin' && (
          <Link to="/admin/dashboard">
            <MenuItem onClick={() => setAnchorEL(null)}>
              <ListItemIcon>
                <Dashboard fontSize="small" />
              </ListItemIcon>
              <Typography variant="subtitle2">Dashboard</Typography>
            </MenuItem>
          </Link>
        )}
        <Link to="/orders">
          <MenuItem onClick={() => setAnchorEL(null)}>
            <ListItemIcon>
              <LocalMall fontSize="small" />
            </ListItemIcon>
            <Typography variant="subtitle2">My Orders</Typography>
          </MenuItem>
        </Link>
        <MenuItem onClick={logoutHandler}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Typography variant="subtitle2">Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
