import { useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';
import { Button,Box,Typography } from '@mui/material';
// import Button from '../common/Button'
import SpiralLoader from '../common/SpiralLoader';
import { toast } from 'react-toastify';
export default function checkoutForm({paymentDetails,handleNext}) {
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading,setIsLoading]=useState(true)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    const { error,paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/products`,
      },
      redirect:'if_required'
    });
    // setMessage(paymentIntent.status);
    // console.log(message)
    // // console.log(typeof(paymentIntent.status))
    // // console.log(error.type)

    // if (error.type == "card_error" || error.type == "validation_error") {
    //   setMessage(error.message);
    // } 
    // else if(paymentIntent.status=="succeeded"){
    //   console.log(true)
    //   setMessage('Payment Status:' + paymentIntent.status);
    // }
    
    //   setMessage('Unexpected Error Occured' + paymentIntent.status)
    
    // setIsProcessing(false);

    if(paymentIntent?.status=='succeeded'){
      // console.log({paymentIntent})
      toast.success('Payment Successfull');
      setMessage('Payment Status: Payment Successfull' );
      handleNext(2, paymentDetails, 'paymentInfo')
      
    }
    else if (error?.type == "card_error" || error?.type == "validation_error") {
      toast.error('Error Occured During Payment:' + error.message);
      setMessage(error.message);
    } 
    else{
      setMessage('Unexpected Error Occured' + paymentIntent.status)
    }
    setIsProcessing(false);
  };
  setTimeout(() => {
    setIsLoading(false)
  }, 2000);
  // console.log(message+" Here is the message")
  return (
    <>
    
    {
      
      isLoading?<div style={{display:'flex',justifyContent:"center"}}><SpiralLoader/></div>:
      <Box
      marginTop={5}
      >
      <form onSubmit={handleSubmit} id='payment-form'>
      <PaymentElement />
      <button
      style={{padding:'12px 75px', marginTop:'20px',backgroundColor:'#0F172A',color:'#fff',borderRadius:'10px'}}
        variant='contained'
        disabled={isProcessing || !stripe || !elements} 
        id='submit'
      >
        <span id='button-text' style={{fontSize:"15px"}}>{isProcessing ? 'Processing ...' : 'Pay & Continue'}</span>
      </button>
      
      {message && <Box><Typography>{message}</Typography> </Box>
          
      }
    </form>
    </Box>
    
    }
    </>
  );
}
