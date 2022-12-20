import { NavigateNext } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Breadcrumbs,
  Chip,
  CircularProgress,
  FormControl,
  FormHelperText,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from '../../actions/userActions';
import Sidebar from '../../components/Admin/Sidebar';
import MetaData from '../../components/MetaData';

const UpdateUser = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { id } = useParams();

  const { error, user, loading } = useSelector((state) => state.userDetails);

  const { error: updateError, loading: updateLoading } = useSelector(
    (state) => state.userDetails
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
  }, [error, alert, dispatch, id, updateError, user]);

  const handleSubmit = () => {
    const updateData = {
      name,
      email,
      role,
    };

    dispatch(updateUser(id, updateData));
  };

  return (
    <>
      <MetaData title="Update User" />
      <Stack direction="row" gap={1} mt={1}>
        <Sidebar tab="users" />

        <Stack flex={4}>
          <Paper sx={{ minHeight: '90vh', padding: '20px' }}>
            <Typography variant="subtitle2" fontSize={22} mb={2}>
              Edit User
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
                <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
                  <Link to="/admin/users">Users</Link>
                  <Typography variant="subtitle2">ID: {user._id}</Typography>
                </Breadcrumbs>
                <Stack direction="row" gap={2} mt={5}>
                  <Stack flex={1.5}>
                    <Stack direction="row" gap={1}>
                      <Typography variant="subtitle2" fontSize="16px">
                        User ID:
                      </Typography>
                      <Typography variant="subtitle2" fontSize="16px">
                        {user && user._id}
                      </Typography>
                    </Stack>
                    <Typography variant="subtitle2" mt={3} mb={0.5}>
                      Name
                    </Typography>
                    <TextField
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      size="small"
                    />

                    <Typography variant="subtitle2" mt={3} mb={0.5}>
                      Email
                    </Typography>
                    <TextField
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      size="small"
                    />

                    <FormControl fullWidth>
                      <Typography variant="subtitle2" mt={3} mb={0.5}>
                        Role
                      </Typography>
                      <Select
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        size="small"
                      >
                        <MenuItem value="">
                          <em>Select Role</em>
                        </MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="user">User</MenuItem>
                        {/* {user && user.role === 'user' ? (
                        <MenuItem value="admin">Admin</MenuItem>
                        ) : (
                          <MenuItem value="user">User</MenuItem>
                        )} */}
                      </Select>
                      <FormHelperText>Change User Role</FormHelperText>
                    </FormControl>

                    <LoadingButton
                      loading={updateLoading}
                      onClick={handleSubmit}
                      sx={{ width: 'fit-content', marginTop: '50px' }}
                      variant="contained"
                      disabled={!name || !email || !role}
                    >
                      Update User
                    </LoadingButton>
                  </Stack>

                  <Stack flex={2} alignItems="center">
                    <Avatar
                      src={user.avatar && user.avatar.url}
                      alt={user && user.name}
                      sx={{ width: 200, height: 200 }}
                    />
                    <Typography variant="subtitle2" fontSize={14} mt={1}>
                      User Avatar
                    </Typography>

                    <Stack direction="row" alignItems="center" gap={3} mt={2}>
                      <Stack gap={1}>
                        <Typography variant="subtitle2" fontSize={16}>
                          Name :
                        </Typography>
                        <Typography variant="subtitle2" fontSize={16}>
                          Email :
                        </Typography>
                        <Typography variant="subtitle2" fontSize={16}>
                          Role :
                        </Typography>
                      </Stack>
                      <Stack gap={1} alignItems="flex-start">
                        <Typography
                          variant="subtitle2"
                          fontSize={16}
                          color="gray"
                        >
                          {user && user.name}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          fontSize={16}
                          color="gray"
                        >
                          {user && user.email}
                        </Typography>
                        <Chip
                          variant="outlined"
                          size="small"
                          label={user && user.role}
                          color={user.role === 'admin' ? 'success' : 'info'}
                        />
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </>
            )}
          </Paper>
        </Stack>
      </Stack>
    </>
  );
};

export default UpdateUser;
