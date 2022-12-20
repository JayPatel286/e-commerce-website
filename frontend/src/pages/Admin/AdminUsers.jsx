import {
  Avatar,
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
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import moment from 'moment';
import MetaData from '../../components/MetaData';
import Sidebar from '../../components/Admin/Sidebar';
import {
  clearErrors,
  deleteUser,
  getAllUsers,
} from '../../actions/userActions';
import { DELETE_USER_RESET } from '../../constants/userConstants';

const AdminUsers = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);

  const {
    loading,
    error,
    users,
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.allUsers);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const columns = [
    {
      field: 'id',
      headerName: 'User ID',
      flex: 0.7,
      cellClassName: 'blue',
    },
    {
      field: 'avatar',
      headerName: 'Avatar',
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Avatar
            src={params.getValue(params.id, 'avatar')}
            alt={params.getValue(params.id, 'name')}
          />
        );
      },
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 0.6,
    },
    {
      field: 'email',
      headerName: 'Email ID',
      flex: 0.6,
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Chip
            label={params.getValue(params.id, 'role')}
            size="small"
            variant="outlined"
            color={
              params.getValue(params.id, 'role') === 'admin'
                ? 'success'
                : 'warning'
            }
          />
        );
      },
    },
    {
      field: 'date',
      headerName: 'Register Date',
      flex: 0.5,
    },
    {
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          params.getValue(params.id, 'id') !== user._id && (
            <>
              <Link to={`/admin/user/${params.getValue(params.id, 'id')}`}>
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
          )
        );
      },
    },
  ];

  const rows = [];
  users &&
    users.forEach((user) => {
      rows.push({
        id: user._id,
        avatar: user.avatar.url,
        name: user.name,
        email: user.email,
        role: user.role,
        date: moment(user.createdAt).format('MMMM Do YYYY'),
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
      alert.success(message);
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [error, alert, dispatch, deleteError, isDeleted, message]);

  return (
    <>
      <MetaData title="Admin: All Users" />
      <Stack direction="row" gap={1} mt={1}>
        <Sidebar tab="users" />

        <Stack flex={4}>
          <Paper sx={{ minHeight: '90vh', padding: '20px' }}>
            <Typography variant="subtitle2" fontSize={22} mb={1}>
              All Registered Users
            </Typography>

            <Typography variant="subtitle2" fontSize={14} my={1} color="gray">
              In the users section, you can review and manage all users with
              their details. You can view and edit many information such as user
              role. Access to this area is limited. Only admins can reach.
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
                rowsPerPageOptions={[5]}
                // getRowHeight={() => 'auto'}
                columns={columns}
                pageSize={5}
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

export default AdminUsers;
