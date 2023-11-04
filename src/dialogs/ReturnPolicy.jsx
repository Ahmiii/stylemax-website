import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
} from '@mui/material';
import React from 'react';
import CustomTypo from '../components/common/CustomTypo';
import InlineLink from '../components/common/Link';
import CancelIcon from '@mui/icons-material/Cancel';

const ReturnPolicyDialog = ({ handleClose, open }) => {
  return (
    <React.Fragment>
      <Dialog
        maxWidth='md'
        onClose={() => handleClose('Return Policy')}
        open={open}
      >
        <DialogTitle sx={{ position: 'relative' }}>
          <CustomTypo
            fontFamily='KoHo'
            variant='h3'
            sx={{ textAlign: 'center' }}
          >
            Return Policy
          </CustomTypo>
          <IconButton
            sx={{ position: 'absolute', top: 10, right: 10 }}
            disableRipple
            onClick={() => handleClose('Return Policy')}
            color='error'
          >
            <CancelIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box>
            <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
              We want you to be completely satisfied with your purchase from our
              website. If you are not satisfied, you may return the item within
              30 days of purchase for a refund or exchange.
              <br />
              <br />
              To initiate a return, please contact our customer service team
              with your order number and the reason for your return. We will
              provide you with a return authorization number and instructions
              for returning the item.
            </CustomTypo>

            <CustomTypo fontFamily='KoHo' variant='h6'>
              Return Eligibility
            </CustomTypo>
            <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
              You are responsible for the cost of return shipping unless the
              item was defective or we made an error in your order. We recommend
              using a trackable shipping method and purchasing shipping
              insurance as we are not responsible for lost or damaged packages.
            </CustomTypo>

            <CustomTypo fontFamily='KoHo' variant='h6'>
              Refunds and Exchanges
            </CustomTypo>
            <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
              Once we receive your return, we will inspect the item and process
              your refund or exchange. Refunds will be issued to the original
              payment method within 5-7 business days. Exchanges will be shipped
              within 1-2 business days of receipt of the return.
              <br />
              <br />
              If you received a defective or incorrect item, please contact our
              customer service team as soon as possible. We will work with you
              to resolve the issue and provide a replacement or refund as
              necessary.
              <br />
              <br />
              If you received a damaged item, please take photos of the damage
              and contact our customer service team as soon as possible. We will
              work with you to file a claim with the shipping carrier and
              provide a replacement or refund as necessary.
              <br />
              <br />
              Please note that we do not refund shipping fees unless the item
              was defective or we made an error in your order.
            </CustomTypo>

            <CustomTypo fontFamily='KoHo' variant='h6'>
              Contact Us
            </CustomTypo>
            <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
              If you have any questions or concerns about our return policy,
              please contact our customer service team at{' '}
              <InlineLink to='/'>returns@stylemax.com</InlineLink>
            </CustomTypo>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default ReturnPolicyDialog;
