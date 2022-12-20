import {
  CheckCircleOutline,
  LocationOn,
  Mail,
  Phone,
  Send,
} from '@mui/icons-material';
import { Container, Paper, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MetaData from '../../components/MetaData';

const Success = () => {
  const { user } = useSelector((state) => state.user);
  const { shippingInfo } = useSelector((state) => state.cart);

  const address = `${shippingInfo.address}, ${shippingInfo.state}, ${shippingInfo.country}, ${shippingInfo.pinCode}`;

  return (
    <>
      <MetaData title="Order Placed" />
      <Container sx={{ marginTop: '50px', minHeight: '85vh' }}>
        <Paper sx={{ padding: '30px', maxWidth: '700px', margin: 'auto' }}>
          <Stack alignItems="center" gap={3}>
            <CheckCircleOutline color="success" fontSize="large" />
            <Typography variant="subtitle2" fontSize={20} color="green">
              Your Order has been placed successfully
            </Typography>
            <Typography
              variant="subtitle2"
              fontSize={12}
              sx={{ color: '#959AA8', marginTop: '-20px' }}
            >
              Thank you for your order. You will receive it in 3 days.
            </Typography>

            <Paper
              sx={{
                padding: '30px',
                backgroundColor: '#232E4D',
                color: '#E3E3E7',
              }}
            >
              <Stack direction="row" gap={1} mb={3}>
                <Send />
                <Typography variant="subtitle2" fontSize={18}>
                  Your order will be sent to this address:
                </Typography>
              </Stack>

              <Stack gap={1}>
                <Stack direction="row" gap={1} sx={{ color: '#B9C2C4' }}>
                  <LocationOn />
                  <Typography variant="subtitle2">{address}</Typography>
                </Stack>
                <Stack direction="row" gap={1}>
                  <Phone />
                  <Typography variant="subtitle2" sx={{ color: '#B9C2C4' }}>
                    {shippingInfo.phoneNumber}
                  </Typography>
                </Stack>
                <Stack direction="row" gap={1} sx={{ color: '#B9C2C4' }}>
                  <Mail />
                  <Typography variant="subtitle2">{user.email}</Typography>
                </Stack>
              </Stack>
            </Paper>

            <Link to="/products">
              <Typography variant="subtitle2">Continue Shopping</Typography>
            </Link>
          </Stack>
        </Paper>
      </Container>
    </>
  );
};

export default Success;
