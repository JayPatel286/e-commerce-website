import {
  AppBar,
  Badge,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { Login, Search, ShoppingCart, Store } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import UserMenu from './UserMenu';

const Header = () => {
  const [keyword, setKeyword] = useState('');
  const theme = createTheme({
    palette: {
      white: {
        main: '#fff',
      },
      black: {
        main: '#333',
      },
    },
  });
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky" color="white">
        <Container maxWidth="lg">
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Website Logo */}
            <Link to={'/'}>
              <Stack direction="row" alignItems="center" gap={1}>
                <Store color="secondary" fontSize="large" />
                <Typography
                  variant="h6"
                  color="secondary"
                  sx={{ fontWeight: 'bold' }}
                >
                  E-Commerce
                </Typography>
              </Stack>
            </Link>

            {/* Search Bar */}
            <form onSubmit={submitHandler}>
              <FormControl sx={{ m: 1, minWidth: '500px' }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Search
                </InputLabel>
                <OutlinedInput
                  size="small"
                  startAdornment={
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  }
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  label="Search"
                />
              </FormControl>
            </form>

            <Stack direction="row" alignItems="center">
              {/* Cart */}
              <Link to="/cart">
                <Tooltip title="Cart">
                  <IconButton sx={{ mx: 0.5 }} color="black">
                    <Badge badgeContent={cartItems.length} color="error">
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </Link>

              {/* Login Button and Profile Menu (Based on you're logged in or not) */}
              {isAuthenticated ? (
                <UserMenu user={user} />
              ) : (
                <Link to={'/login'}>
                  <Tooltip title="Login">
                    <IconButton sx={{ mx: 0.5 }} color="black">
                      <Login />
                    </IconButton>
                  </Tooltip>
                </Link>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
