import { Box, styled } from '@mui/material';
import React from 'react';
import Container from '../components/common/Container';
import CustomTypo from '../components/common/CustomTypo';
import Page from '../components/common/Page';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import InlineLink from '../components/common/Link';

const BuyerProtectionPolicy = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Page title='StyleMax | Buyer Protection Policy'>
      <Container>
        <CustomTypo
          fontFamily='KoHo'
          variant='h3'
          sx={{ textAlign: 'center', mb: 1 }}
        >
          Buyer Protection Policy
        </CustomTypo>
        <CustomTypo
          fontFamily='KoHo'
          variant='subtitle1'
          sx={{ textAlign: 'center', maxWidth: '800px', mx: 'auto' }}
        >
          We understand that shopping online can be a bit daunting, which is why
          we want to make sure that you feel secure and protected while shopping
          on our platform. That's why we offer the following Buyer Protection
          Policy to give you peace of mind
        </CustomTypo>

        <Box mt={3} maxWidth='800px' marginInline='auto'>
          <Accordion defaultExpanded={true}>
            <AccordionSummaryExt
              expandIcon={
                expanded && expanded === 'panel1' ? (
                  <RemoveIcon sx={{ color: '#fff' }} />
                ) : (
                  <AddIcon sx={{ color: '#fff' }} />
                )
              }
              aria-controls='panel1bh-content'
              id='panel1bh-header'
            >
              <Typography variant='subtitle1' sx={{ flexShrink: 0 }}>
                Authenticity Guarantee
              </Typography>
            </AccordionSummaryExt>
            <AccordionDetailsExt>
              <Typography variant='body1'>
                All products sold on our platform are 100% authentic and
                genuine. We work directly with our suppliers to ensure that all
                products are authentic, and we never sell counterfeit items.
              </Typography>
            </AccordionDetailsExt>
          </Accordion>
          <Accordion defaultExpanded={true}>
            <AccordionSummaryExt
              expandIcon={
                expanded && expanded === 'panel2' ? (
                  <RemoveIcon sx={{ color: '#fff' }} />
                ) : (
                  <AddIcon
                    sx={{
                      color: '#fff',
                    }}
                  />
                )
              }
              aria-controls='panel2bh-content'
              id='panel2bh-header'
            >
              <Typography variant='subtitle1' sx={{ flexShrink: 0 }}>
                Secure Payments
              </Typography>
            </AccordionSummaryExt>
            <AccordionDetailsExt>
              <Typography variant='body1'>
                We use industry-standard encryption to protect your payment
                information and ensure that your transactions are safe and
                secure. We also offer a variety of payment options to make
                shopping convenient for you.
              </Typography>
            </AccordionDetailsExt>
          </Accordion>
          <Accordion defaultExpanded={true}>
            <AccordionSummaryExt
              expandIcon={
                expanded && expanded === 'panel3' ? (
                  <RemoveIcon sx={{ color: '#fff' }} />
                ) : (
                  <AddIcon
                    sx={{
                      color: '#fff',
                    }}
                  />
                )
              }
              aria-controls='panel3bh-content'
              id='panel3bh-header'
            >
              <Typography variant='subtitle1' sx={{ flexShrink: 0 }}>
                Easy Returns and Refunds
              </Typography>
            </AccordionSummaryExt>
            <AccordionDetailsExt>
              <Typography variant='body1'>
                If you are not satisfied with your purchase, you can return it
                within 30 days for a full refund or exchange. All you need to do
                is contact our customer service team, and we'll guide you
                through the return process. Please note that some restrictions
                may apply.
              </Typography>
            </AccordionDetailsExt>
          </Accordion>
          <Accordion defaultExpanded={true}>
            <AccordionSummaryExt
              expandIcon={
                expanded && expanded === 'panel4' ? (
                  <RemoveIcon sx={{ color: '#fff' }} />
                ) : (
                  <AddIcon
                    sx={{
                      color: '#fff',
                    }}
                  />
                )
              }
              aria-controls='panel4bh-content'
              id='panel4bh-header'
            >
              <Typography variant='subtitle1' sx={{ flexShrink: 0 }}>
                Buyer Protection Guarantee
              </Typography>
            </AccordionSummaryExt>
            <AccordionDetailsExt>
              <Typography variant='body1'>
                We offer a Buyer Protection Guarantee to ensure that you receive
                the product you ordered and that it meets your expectations. If
                you do not receive your order or if the product is not as
                described, we will either refund your payment or send you a
                replacement product at no additional cost.
              </Typography>
            </AccordionDetailsExt>
          </Accordion>
          <Accordion defaultExpanded={true}>
            <AccordionSummaryExt
              expandIcon={
                expanded && expanded === 'panel5' ? (
                  <RemoveIcon sx={{ color: '#fff' }} />
                ) : (
                  <AddIcon
                    sx={{
                      color: '#fff',
                    }}
                  />
                )
              }
              aria-controls='panel5bh-content'
              id='panel5bh-header'
            >
              <Typography variant='subtitle1' sx={{ flexShrink: 0 }}>
                Timely Delivery
              </Typography>
            </AccordionSummaryExt>
            <AccordionDetailsExt>
              <Typography variant='body1'>
                We work hard to ensure that your order is delivered on time. We
                provide estimated delivery times for each product, and we keep
                you updated on the status of your order every step of the way.
              </Typography>
            </AccordionDetailsExt>
          </Accordion>
        </Box>
      </Container>
    </Page>
  );
};

const AccordionDetailsExt = styled(AccordionDetails)(({ theme }) => ({
  background: theme.palette.grey[100],
}));

const AccordionSummaryExt = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
}));

export default BuyerProtectionPolicy;
