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

export default function BillingAccordian({ handleInputChange, value }) {
  const [expanded, setExpanded] = React.useState('sameBilling');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box mt={3}>
      <Accordion
        expanded={expanded === 'paypal'}
        onChange={handleChange('paypal')}
      >
        <AccordionSummary
          aria-controls='panel2d-content'
          id='panel2d-header'
          expanded={expanded === 'paypal'}
        >
          <CustomTypo variant='subtitle2' fontFamily='KoHo' color='secondary'>
            Same as shipping address
          </CustomTypo>
        </AccordionSummary>
      </Accordion>
      <Accordion
        expanded={expanded === 'sameBilling'}
        onChange={handleChange('sameBilling')}
      >
        <AccordionSummary
          aria-controls='panel1d-content'
          id='panel1d-header'
          expanded={expanded === 'sameBilling'}
        >
          <CustomTypo variant='subtitle2' fontFamily='KoHo' color='secondary'>
            Use a different billing address
          </CustomTypo>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <OutlinedInput
                size='small'
                name='billingAddress'
                value={value?.billingAddress || ''}
                onChange={handleInputChange}
                placeholder='billing address'
                fullWidth
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
