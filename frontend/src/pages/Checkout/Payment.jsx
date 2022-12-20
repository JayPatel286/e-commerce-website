import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useEffect, useState } from 'react';
import { clearErrors, createOrder } from '../../actions/orderActions';
import { clearCart } from '../../actions/cartActions';
import MetaData from '../../components/MetaData';
import CheckoutSteps from '../../components/CheckoutSteps';
import OrderSummery from '../../components/OrderSummery';

const Payment = () => {
  const [loading, setLoading] = useState(false);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const navigate = useNavigate();
  const elements = useElements();

  useEffect(() => {
    if (error) {
      alert.error(error);

      dispatch(clearErrors());
    }
  }, [error, dispatch, alert]);

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subTotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.deliveryCharge,
    totalPrice: orderInfo.totalPrice,
  };

  const submitPay = async () => {
    setLoading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
      };

      const { data } = await axios.post(
        '/api/v1/payment/process',
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              state: shippingInfo.state,
              country: shippingInfo.country,
              postal_code: shippingInfo.pinCode,
            },
          },
        },
      });

      if (result.error) {
        setLoading(false);
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          dispatch(clearCart());

          navigate('/success');
        } else {
          alert.error('There was some issue while processing payment!!');
        }
      }
    } catch (error) {
      setLoading(false);
      alert.error(error.message);
    }
  };

  return (
    <>
      <MetaData title="Payment Process" />
      <Container sx={{ marginTop: '25px', minHeight: '85vh' }}>
        <CheckoutSteps activeStep={2} />

        <Stack direction="row" gap={2} mt={3}>
          <Stack flex={3}>
            <Paper sx={{ padding: '20px' }}>
              <Typography variant="h6">Enter your Card Details</Typography>
              <Grid container spacing={2} mt={2}>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle2"
                    fontSize={12}
                    color="GrayText"
                  >
                    Card Number
                  </Typography>
                  <Box className="inputEl">
                    <CardNumberElement />
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Typography
                    variant="subtitle2"
                    fontSize={12}
                    color="GrayText"
                  >
                    Expires on
                  </Typography>
                  <Box className="inputEl">
                    <CardExpiryElement />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle2"
                    fontSize={12}
                    color="GrayText"
                  >
                    CVC Code
                  </Typography>
                  <Box className="inputEl">
                    <CardCvcElement />
                  </Box>
                </Grid>
              </Grid>

              <LoadingButton
                variant="contained"
                sx={{ float: 'right', marginTop: 2 }}
                onClick={submitPay}
                loading={loading}
              >
                Pay ₹ {orderInfo && orderInfo.totalPrice.toLocaleString()}
              </LoadingButton>
            </Paper>
          </Stack>

          <Stack flex={2}>
            <OrderSummery cartItems={cartItems} />
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default Payment;
