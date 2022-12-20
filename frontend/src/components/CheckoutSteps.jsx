// import { LibraryAddCheck, LocalShipping, Payment } from '@mui/icons-material';
import { Step, StepLabel, Stepper, Typography } from '@mui/material';

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography variant="subtitle2">Shipping Details</Typography>,
      // label: <LocalShipping />,
    },
    {
      label: <Typography variant="subtitle2">Confirm Order</Typography>,
      // label: <LibraryAddCheck />,
    },
    {
      label: <Typography variant="subtitle2">Payment</Typography>,
      // label: <Payment />,
    },
  ];

  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((item, index) => (
          <Step key={index}>
            <StepLabel>{item.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckoutSteps;
