import React, { useState, useEffect } from 'react';
import Container from '../components/common/Container';
import Page from '../components/common/Page';
import { Box, Grid, Step, StepLabel, Stepper } from '@mui/material';
import Customer from '../components/checkout/customer';
import { useSelector } from 'react-redux';
import CheckoutProdGrid from '../components/checkout/checkoutProdGrid';
import CompletedStep from '../components/checkout/completedStep';
import Shipping from '../components/checkout/shipping';
import Payment from '../components/checkout/payment';
import Confirmation from '../components/checkout/confirmation';
import { processOrder } from '../api/orders';
import { useDispatch } from 'react-redux';
import { getCart } from '../store/slices/cart/extraReducers';
import { toast } from 'react-toastify';

const steps = ['Customer', 'Shipping', 'Payment', 'Review'];

const Checkout = () => {
  const { user, isLoggedIn } = useSelector((st) => st.auth);
  const { cart } = useSelector((st) => st.cart);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [promoCode, setPromoCode] = React.useState('');

  const [compStepInfo, setCompStepInfo] = useState([]);
  const [checkoutInfo, setCheckoutInfo] = useState({
    customer: user,
    shippingAddress: null,
    paymentInfo: null,
  });

  const [orderInfo, setOrderInfo] = useState(null);

  const handleNextStep = async (stepNo, info, name) => {
    console.log({stepNo})
    setActiveStep((st) => st + 1);
    setCheckoutInfo((st) => ({ ...st, [name]: info }));
    if (compStepInfo.length > 0)
      setCompStepInfo((st) => ({ ...st, [stepNo]: info }));
    else setCompStepInfo(() => [{ ...info }]);
    // console.log({stepNo})
    if (stepNo + 1 === 3) {
      let orders = [];
      for (let i = 0; i < cart?.cartItems?.length; i++) {
        const oneOrder = processOrder({
          product_id: cart?.cartItems[i]?.product?.id,
          quantity: cart?.cartItems[i]?.quantity,
          ...(promoCode !== '' && { promo_code: promoCode }),
        });
      

        if (cart?.cartItems[i]?.product?.id && cart?.cartItems[i]?.quantity)
          orders.push(oneOrder);
      }
      const responseAllOrders = await Promise.allSettled(orders);
      
      setOrderInfo(responseAllOrders);
      if (responseAllOrders[0].status == 'rejected') {
        toast.error(responseAllOrders[0].reason + "YAYAYAYAYAYA");
      } else {
        toast.success('Thank you! Your order is confirmed');
      }
    }
  };

  const goToStep = (stepNo) => {
    setActiveStep(stepNo);  
  };

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    <Page title='StyleMax | Checkout'>
      <Container>
        <Box sx={{ width: '100%', mb: 4 }}>
          {activeStep <= 2 && (
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          )}
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            {cart?.cartItems && (
              <CheckoutProdGrid
                products={cart?.cartItems}
                sendPromoCode={(dis) => setPromoCode(dis)}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Box
              height='100%'
              sx={{
                outline: (theme) => `1px solid ${theme.palette.divider}`,
              }}
            >
              {activeStep === 0 && (
                <Customer
                  handleNext={handleNextStep}
                  value={checkoutInfo.customer}
                  userLoggedIn={isLoggedIn}
                />
              )}
              {activeStep === 1 && (
                <>
                  <CompletedStep
                    title='Customer'
                    description={checkoutInfo.customer.email}
                    handleEdit={goToStep}
                    stepNo={0}
                  />
                  <Shipping
                    activeStep={activeStep}
                    handleNext={handleNextStep}
                    value={checkoutInfo.shippingAddress}
                    goToStep={goToStep}
                  />
                </>
              )}
              {activeStep === 2 && (
                <React.Fragment>
                  <CompletedStep
                    title='Customer'
                    description={checkoutInfo.customer.email}
                    handleEdit={goToStep}
                    stepNo={0}
                  />
                  <CompletedStep
                    title='Shipping Address'
                    description={checkoutInfo.shippingAddress.address}
                    handleEdit={goToStep}
                    stepNo={1}
                  />
                  <Payment handleEdit={goToStep} handleNext={handleNextStep} 
                  products={cart?.cartItems}
                  sendPromoCode={(dis) => setPromoCode(dis)}
                  />
                </React.Fragment>
              )}
              {activeStep === 3 && (
                <React.Fragment>
                  <Confirmation value={checkoutInfo} orderInfo={orderInfo} />
                </React.Fragment>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Checkout;
