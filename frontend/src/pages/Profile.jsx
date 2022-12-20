import {
  AddPhotoAlternate,
  ChevronRight,
  PowerSettingsNew,
  ShoppingBag,
} from '@mui/icons-material';
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors, logout, updateProfile } from '../actions/userActions';
import ChangePasswordModal from '../components/ChangePasswordModal';
import MetaData from '../components/MetaData';

const Profile = () => {
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(user.avatar.url);
  const [editMode, setEditMode] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const logoutHandler = () => {
    dispatch(logout());
    // navigate('/');
  };

  const cancelEdit = () => {
    setName(user.name);
    setEmail(user.email);
    setAvatar(user.avatar.url);

    setEditMode(false);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };

  const handleUpdate = () => {
    if (avatar !== user.avatar.url) {
      dispatch(updateProfile({ name, email, avatar }));
    } else {
      dispatch(updateProfile({ name, email }));
    }

    setEditMode(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate, error, dispatch, alert]);

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
          <MetaData title={`${user.name}'s Profile`} />
          {user && (
            <Stack direction="row" mt={3} gap={3}>
              <Stack gap={2} flex={1}>
                <Paper sx={{ padding: '10px 15px' }} elevation="2">
                  <Stack direction="row" alignItems="center" gap={2}>
                    <Avatar
                      src={user.avatar && user.avatar.url}
                      alt={user && user.name}
                      sx={{ width: 50, height: 50 }}
                    />

                    <Typography variant="subtitle2">{user.name}</Typography>
                  </Stack>
                </Paper>

                <Paper elevation="2">
                  <List>
                    <Link to="/orders">
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <ShoppingBag color="primary" />
                          </ListItemIcon>
                          <ListItemText primary="My Orders" />
                          <ChevronRight />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                    <Divider />
                    <ListItem disablePadding>
                      <ListItemButton onClick={logoutHandler}>
                        <ListItemIcon>
                          <PowerSettingsNew color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Paper>
              </Stack>

              <Stack flex={3}>
                <Paper elevation={2} sx={{ padding: '20px' }}>
                  <Stack direction="row" gap={1}>
                    <Typography variant="h6">Personal Information</Typography>
                    {editMode ? (
                      <Button onClick={cancelEdit}>Cancel</Button>
                    ) : (
                      <Button onClick={() => setEditMode(true)}>Edit</Button>
                    )}
                  </Stack>

                  <Typography variant="subtitle2" mt={3} mb={0.5}>
                    Name
                  </Typography>
                  <TextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    size="small"
                    disabled={!editMode}
                  />

                  <Typography variant="subtitle2" mt={3} mb={0.5}>
                    Email
                  </Typography>
                  <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="small"
                    disabled={!editMode}
                  />

                  <Typography variant="subtitle2" mt={3} mb={1}>
                    Avatar
                  </Typography>
                  <Stack direction="row" gap={1} alignItems="center">
                    <Avatar src={avatar} alt={name} />
                    {editMode && (
                      <Button
                        aria-label="upload picture"
                        component="label"
                        startIcon={<AddPhotoAlternate />}
                      >
                        <input
                          hidden
                          accept="image/*"
                          type="file"
                          onChange={handleImage}
                        />
                        Change Avatar
                      </Button>
                    )}
                  </Stack>

                  {editMode && (
                    <Stack
                      direction="row"
                      gap={1}
                      mt={3}
                      justifyContent="flex-end"
                    >
                      <Button variant="contained" onClick={handleUpdate}>
                        Save Changes
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  )}

                  <Button
                    variant="contained"
                    sx={{ marginTop: 5 }}
                    onClick={() => setOpenModal(true)}
                  >
                    Change Password
                  </Button>
                  <ChangePasswordModal
                    open={openModal}
                    setOpen={setOpenModal}
                  />
                </Paper>
              </Stack>
            </Stack>
          )}
        </Container>
      )}
    </>
  );
};

export default Profile;
