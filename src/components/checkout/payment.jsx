import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import CustomTypo from '../common/CustomTypo';
import BillingAccordian from './billingAddress';
import PaymentAccordian from './paymentMethod';
import API_URL from '../../config';
import CheckoutForm from './checkoutForm';
import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

function calculateTotal(cartItems, shipping, promo = 0) {
  let subTotal = cartItems?.reduce((total, cartItem) => {
    return (
      total + cartItem?.product?.details?.offered_price * cartItem?.quantity
    );
  }, 0);
  let total = subTotal + shipping - promo * cartItems.length;
  return { subTotal, total };
}

export default function Payment({
  handleNext,
  value,
  products,
  sendPromoCode,
}) {
  const [stripePromise, setStripePromise] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const currency = 'USD';

  function handleChange(e) {
    if (paymentDetails)
      return setPaymentDetails((st) => ({
        ...st,
        [e.target.name]: e.target.value,
      }));
    setPaymentDetails({ [e.target.name]: e.target.value });
  }

  useEffect(() => {
    fetch(`${API_URL}/config`).then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/create-payment-intents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount:
          products.length > 0
            ? calculateTotal(
                products,
                products &&
                  products
                    .map((el) => el?.product?.details?.shipping_fee)
                    .reduce((a, b) => a + b, 0),
                Number(promoDiscount) ?? 0
              ).total * 100
            : 0,
        currency: currency,
      }),
    }).then(async (r) => {
      const { clientSecret } = await r.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <React.Fragment>
      <Box
        py={2}
        mb={4}
        pl='60px'
        sx={{ backgroundColor: (theme) => theme.palette.grey[200] }}
      >
        <CustomTypo fontFamily='KoHo' variant='h5' color='secondary'>
          Payment
        </CustomTypo>
      </Box>
      <Box pl='60px' pr='2rem' mb={4}>
        <CustomTypo fontFamily='KoHo' variant='h6' sx={{ fontWeight: 500 }}>
          Payment Method
        </CustomTypo>
        <CustomTypo fontFamily='KoHo' variant='body2'>
          All transactions are secure and encrypted.
        </CustomTypo>

        {clientSecret && stripePromise && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm paymentDetails={paymentDetails} handleNext={handleNext}/>
          </Elements>
        )}
        <PaymentAccordian
          handleInputChange={handleChange}
          value={paymentDetails}
        />
        <CustomTypo
          fontFamily='KoHo'
          variant='h6'
          sx={{ fontWeight: 500, mt: 5 }}
        >
          Billing Address
        </CustomTypo>
        <CustomTypo fontFamily='KoHo' variant='body2'>
          Select the address that matches your card of payment method.
        </CustomTypo>
        <BillingAccordian
          handleInputChange={handleChange}
          value={paymentDetails}
        />
        <Button
          variant='contained'
          color='primary'
          sx={{ mt: 5, minWidth: '220px' }}
          size='large'
          onClick={() => handleNext(2, paymentDetails, 'paymentInfo')}
        >
          Confirm Order 
        </Button>
      </Box>
    </React.Fragment>
  );
}
