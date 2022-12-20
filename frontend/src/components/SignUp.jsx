import { AddAPhoto, Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, register } from '../actions/userActions';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

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

  const submitRegister = () => {
    const myForm = new FormData();

    myForm.set('name', name);
    myForm.set('email', email);
    myForm.set('password', password);
    myForm.set('avatar', avatar);

    dispatch(register(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [alert, error, dispatch, isAuthenticated, navigate]);

  return (
    <Box p={3} mt={1}>
      <Stack gap={4} px={5} py={2}>
        <Box sx={{ position: 'relative' }} alignSelf="center">
          <Avatar sx={{ width: 100, height: 100 }} src={avatar} />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            sx={{ position: 'absolute', bottom: 0, right: 0 }}
          >
            <input hidden accept="image/*" type="file" onChange={handleImage} />
            <AddAPhoto />
          </IconButton>
        </Box>

        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          size="small"
          variant="outlined"
          label="Name"
          required
        />
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="small"
          variant="outlined"
          label="Email"
          required
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          size="small"
          // error
          // helperText="Required"
          // value={password}
          // onChange={handleChange('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          required
          label="Password"
        />

        <LoadingButton
          loading={loading}
          variant="contained"
          onClick={submitRegister}
        >
          Sign Up
        </LoadingButton>
      </Stack>
    </Box>
  );
};

export default SignUp;
