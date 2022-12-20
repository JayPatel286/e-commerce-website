import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login } from '../actions/userActions';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const submitLogin = () => {
    dispatch(login(email, password));
  };

  const redirect = location.search ? `/${location.search.split('=')[1]}` : -1;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [alert, error, dispatch, isAuthenticated, navigate, redirect]);

  return (
    <Box p={3} mt={1}>
      <Stack gap={4} p={5}>
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
          onClick={submitLogin}
        >
          Login
        </LoadingButton>
      </Stack>
    </Box>
  );
};

export default Login;
