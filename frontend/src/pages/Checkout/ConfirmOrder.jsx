import { ChevronLeft, Payment } from '@mui/icons-material';
import { Button, Container, Paper, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../../components/CheckoutSteps';
import MetaData from '../../components/MetaData';
import OrderSummery from '../../components/OrderSummery';

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const address = `${shippingInfo.address}, ${shippingInfo.state}, ${shippingInfo.country}, ${shippingInfo.pinCode}`;

  const getSubtotal = () => {
    let total = 0;

    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });

    return total;
  };
  const discount = 500;
  const deliveryCharge = getSubtotal() > 1000 ? 0 : 40;
  const tax = getSubtotal() * 0.05;

  const getTotalPrice = () => {
    return getSubtotal() + deliveryCharge + tax - discount;
  };

  const proceedToPayment = () => {
    const data = {
      subTotal: getSubtotal(),
      deliveryCharge,
      tax,
      totalPrice: getTotalPrice(),
    };

    sessionStorage.setItem('orderInfo', JSON.stringify(data));

    navigate('/process/payment');
  };

  return (
    <>
      <MetaData title="Confirm Order" />
      <Container sx={{ marginTop: '25px', minHeight: '85vh' }}>
        <CheckoutSteps activeStep={1} />
        <Stack direction="row" gap={2} mt={3}>
          <Stack flex={2}>
            <Paper sx={{ padding: '20px' }}>
              <Stack gap={1}>
                <Typography variant="subtitle2" fontSize={16} mb={2}>
                  Shipping Details
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  width="50%"
                  mb={2}
                >
                  <Stack>
                    <Typography variant="subtitle2" fontSize={16} color="gray">
                      Name
                    </Typography>
                    <Typography variant="subtitle2" fontSize={16} color="gray">
                      Phone No
                    </Typography>
                    <Typography variant="subtitle2" fontSize={16} color="gray">
                      Address
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography variant="subtitle2" fontSize={16}>
                      {user.name}
                    </Typography>
                    <Typography variant="subtitle2" fontSize={16}>
                      {shippingInfo.phoneNumber}
                    </Typography>
                    <Typography variant="subtitle2" fontSize={16}>
                      {address}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
              <Link to="/shipping">
                <Button startIcon={<ChevronLeft />} variant="text">
                  Edit Shipping Info
                </Button>
              </Link>

              <Typography variant="subtitle2" fontSize={18} my={3} color="gray">
                Verify your shipping details and proceed for payment
              </Typography>
              <Button
                startIcon={<Payment />}
                variant="contained"
                sx={{ float: 'right' }}
                onClick={proceedToPayment}
              >
                Proceed to Payment
              </Button>
            </Paper>
          </Stack>

          <Stack flex={1}>
            <OrderSummery cartItems={cartItems} />
          </Stack>
        </Stack>
      </Container>
      {/* https://dribbble.com/shots/10730228-Order-Checkout */}
    </>
  );
};

export default ConfirmOrder;
