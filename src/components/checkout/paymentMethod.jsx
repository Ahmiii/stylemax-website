import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {
  Box,
  Button,
  Checkbox,
  Grid,
  InputAdornment,
  OutlinedInput,
  Radio,
  TextField,
} from '@mui/material';
import CustomTypo from '../common/CustomTypo';
import paymentMethods from '../../assets/payment/paymentMethodsUpd.svg';
import affirm from '../../assets/payment/affirm.svg';
import paypal from '../../assets/payment/paypal.svg';
import HelpIcon from '@mui/icons-material/Help';
import LockIcon from '@mui/icons-material/Lock';
import CheckoutForm from './checkoutForm';



import {loadStripe} from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';


const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} rounded {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));



// Stripe integration 

  

const AccordionSummary = styled((props) => (
  
  <MuiAccordionSummary
    expandIcon={
      <Radio
        color='info'
        checked={props.expanded}
        name='radio-buttons'
        sx={{ padding: 0, mr: 1 }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'transparent',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(0deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: 'rgba(0, 0, 0, .03)',
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function PaymentAccordian({ handleInputChange, value }) {
  const [expanded, setExpanded] = React.useState('creditCard');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  //const [epanded, setEpanded] = React.useState('creditCard');

  return (
    <>

    </>

    // <Box mt={3}>
    //   <Accordion
    //     expanded={expanded === 'creditCard'}
    //     onChange={handleChange('creditCard')}
    //   >
    //     <AccordionSummary
    //       aria-controls='panel1d-content'
    //       id='panel1d-header'
    //       expanded={expanded === 'creditCard'}
    //     >
    //       <Box
    //         width='100%'
    //         display='flex'
    //         justifyContent='space-between'
    //         gap={2}
    //       >
    //         <CustomTypo variant='subtitle2' fontFamily='KoHo' color='secondary'>
    //           Credit Card
    //         </CustomTypo>
    //         <Box sx={{ objectFit: 'contain' }}>
    //           <img src={paymentMethods} width='100%' height='100%' />
    //         </Box>
    //       </Box>
    //     </AccordionSummary>
    //     <AccordionDetails>
    //       <Grid container spacing={2}>
    //         <Grid item xs={12}>
    //           <OutlinedInput
    //             size='small'
    //             name='cardNumber'
    //             type='number'
    //             value={value?.cardNumber || ''}
    //             onChange={handleInputChange}
    //             placeholder='Card number'
    //             fullWidth
    //           />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <OutlinedInput
    //             size='small'
    //             name='nameOnCard'
    //             value={value?.nameOnCard || ''}
    //             onChange={handleInputChange}
    //             placeholder='Name on Card'
    //             fullWidth
    //             endAdornment={
    //               <InputAdornment position='end'>
    //                 <LockIcon />
    //               </InputAdornment>
    //             }
    //           />
    //         </Grid>
    //         <Grid item xs={12} md={6}>
    //           <OutlinedInput
    //             size='small'
    //             name='expirationDate'
    //             value={value?.expirationDate || ''}
    //             onChange={handleInputChange}
    //             placeholder='Expiration Date (MM/YY)'
    //             fullWidth
    //           />
    //         </Grid>
    //         <Grid item xs={12} md={6}>
    //           <OutlinedInput
    //             size='small'
    //             name='securityCode'
    //             value={value?.securityCode || ''}
    //             onChange={handleInputChange}
    //             placeholder='Security Code'
    //             fullWidth
    //             endAdornment={
    //               <InputAdornment position='end'>
    //                 <HelpIcon />
    //               </InputAdornment>
    //             }
    //           />
    //         </Grid>
    //       </Grid>
    //     </AccordionDetails>
    //   </Accordion>
    //   <Accordion
    //     expanded={expanded === 'paypal'}
    //     onChange={handleChange('paypal')}
    //   >
    //     <AccordionSummary
    //       aria-controls='panel2d-content'
    //       id='panel2d-header'
    //       expanded={expanded === 'paypal'}
    //     >
    //       <Box sx={{ objectFit: 'contain' }}>
    //         <img src={paypal} width='100%' height='100%' />
    //       </Box>
    //     </AccordionSummary>
    //     <AccordionDetails sx={{ textAlign: 'center' }}>
    //       <Button variant='contained' color='info'>
    //         Continue with PayPal
    //       </Button>
    //     </AccordionDetails>
    //   </Accordion>
    //   <Accordion
    //     expanded={expanded === 'affirm'}
    //     onChange={handleChange('affirm')}
    //   >
    //     <AccordionSummary
    //       aria-controls='panel3d-content'
    //       id='panel3d-header'
    //       expanded={expanded === 'affirm'}
    //     >
    //       <Box sx={{ objectFit: 'contain' }}>
    //         <img src={affirm} width='100%' height='100%' />
    //       </Box>
    //     </AccordionSummary>
    //     <AccordionDetails sx={{ textAlign: 'center' }}>
    //       <Button
    //         variant='contained'
    //         sx={{
    //           backgroundColor: '#4a4af4',
    //           '&:hover': {
    //             backgroundColor: '#2f2fc1',
    //           },
    //         }}
    //       >
    //         Continue with affirm
    //       </Button>
    //     </AccordionDetails>
    //   </Accordion>
    // </Box>
  );
}
