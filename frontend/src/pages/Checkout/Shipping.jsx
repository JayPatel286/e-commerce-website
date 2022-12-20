import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useAlert } from 'react-alert';
import { useSelector, useDispatch } from 'react-redux';
import MuiPhoneNumber from 'material-ui-phone-number';
import OrderSummery from '../../components/OrderSummery';
import { Link, useNavigate } from 'react-router-dom';
import {
  AssignmentTurnedIn,
  Public,
  TransferWithinAStation,
} from '@mui/icons-material';
import { Country, State } from 'country-state-city';
import { saveShippingInfo } from '../../actions/cartActions';
import MetaData from '../../components/MetaData';
import CheckoutSteps from '../../components/CheckoutSteps';

const Shipping = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNo);

  const submitShipping = () => {
    if (!address || !phoneNumber || !country || !state || !pinCode) {
      alert.error('All fields are required');
      return;
    }

    if (phoneNumber.length < 14) {
      alert.error('Phone number must be at least 10 characters');
      return;
    }

    dispatch(
      saveShippingInfo({ address, state, country, pinCode, phoneNumber })
    );
    navigate('/confirm/order');
  };

  return (
    <>
      <MetaData title="Shipping Details" />
      <Container sx={{ marginTop: '25px', minHeight: '85vh' }}>
        <CheckoutSteps activeStep={0} />
        <Stack direction="row" gap={2} mt={3}>
          <Stack flex={2}>
            <Paper sx={{ padding: '20px' }}>
              <Stack gap={2.5}>
                <Typography variant="subtitle2" fontSize="20px">
                  Shipping Details
                </Typography>

                <FormControl>
                  <TextField
                    label="Address"
                    size="small"
                    variant="outlined"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <FormHelperText>Type your Address</FormHelperText>
                </FormControl>

                <Stack direction="row" gap={2}>
                  <MuiPhoneNumber
                    value={phoneNumber}
                    onChange={(value) => setPhoneNumber(value)}
                    sx={{ width: '100%' }}
                    defaultCountry={'in'}
                    size="small"
                    variant="outlined"
                    label="Phone No."
                  />
                  <TextField
                    value={pinCode}
                    onChange={(e) => {
                      if (e.target.value.length <= 6)
                        setPinCode(e.target.value);
                    }}
                    type="number"
                    sx={{ width: '100%' }}
                    label="Pin Code"
                    size="small"
                    variant="outlined"
                  />
                </Stack>

                <Stack direction="row" flex={1} gap={2}>
                  <FormControl sx={{ width: '100%' }} size="small">
                    <InputLabel id="demo-simple-select-helper-label">
                      Country
                    </InputLabel>
                    <Select
                      startAdornment={
                        <InputAdornment position="start">
                          <Public />
                        </InputAdornment>
                      }
                      MenuProps={{
                        transformOrigin: {
                          vertical: 'bottom',
                          horizontal: 'left',
                        },
                        // getContentAnchorEl: null,
                      }}
                      label="Country"
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {Country &&
                        Country.getAllCountries().map((c) => (
                          <MenuItem value={c.isoCode} key={c.isoCode}>
                            {c.name}
                          </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>Select a Country</FormHelperText>
                  </FormControl>
                  <FormControl sx={{ width: '100%' }} size="small">
                    <InputLabel id="demo-simple-select-helper-label">
                      State
                    </InputLabel>
                    <Select
                      startAdornment={
                        <InputAdornment position="start">
                          <TransferWithinAStation />
                        </InputAdornment>
                      }
                      label="State"
                      disabled={!country}
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {State &&
                        State.getStatesOfCountry(country).map((s) => (
                          <MenuItem value={s.name} key={s.isoCode}>
                            {s.name}
                          </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>Select a State</FormHelperText>
                  </FormControl>
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  mt={3}
                  alignItems="flex-end"
                >
                  <Link to="/products">
                    <Typography variant="subtitle2" fontSize="14px">
                      Keep Shopping
                    </Typography>
                  </Link>
                  <Button
                    startIcon={<AssignmentTurnedIn />}
                    disabled={cartItems.length === 0}
                    variant="contained"
                    onClick={submitShipping}
                  >
                    Confirm Order
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          </Stack>

          <Stack flex={1}>
            <OrderSummery cartItems={cartItems} />
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default Shipping;
