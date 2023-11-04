import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BuyerProtection from '../../dialogs/BuyerProtection';
import ReturnPolicyDialog from '../../dialogs/ReturnPolicy';
import CustomTypo from '../common/CustomTypo';
import InlineLink from '../common/Link';
import TextButton from '../common/TextButton';

const Return_policy = () => {
  const [dialog, setDialog] = useState({
    returnPolicy: false,
    protetionPolicy: false,
  });

  const handleOpenDialog = (e) => {
    const { label } = e.currentTarget.dataset;
    if (label === 'Return Policy')
      return setDialog((st) => ({ ...st, returnPolicy: true }));
    setDialog((st) => ({ ...st, protetionPolicy: true }));
  };

  const handleCloseDialog = (label) => {
    if (label === 'Return Policy')
      return setDialog((st) => ({ ...st, returnPolicy: false }));
    setDialog((st) => ({ ...st, protetionPolicy: false }));
  };

  return (
    <React.Fragment>
      <Box>
        <CustomTypo fontFamily='KoHo' variant='subtitle1' sx={{ mb: 1 }}>
          Shipping & Returns
        </CustomTypo>
        <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 1 }}>
          This item is final sale and is not returnable.
        </CustomTypo>
        <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 7 }}>
          See the
          <TextButton
            onClick={handleOpenDialog}
            label='Return Policy'
            size='large'
            color='error'
            sx={{
              textDecoration: 'underline',
              py: 0,
              px: 0.75,
              mt: '-4px',
            }}
          />
          for more details.
        </CustomTypo>
      </Box>
      <Box>
        <CustomTypo fontFamily='KoHo' variant='subtitle1' sx={{ mb: 1 }}>
          Buyer Protection Policy
        </CustomTypo>
        <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 1 }}>
          Get your order as described or receive your money back.{' '}
          <TextButton
            onClick={handleOpenDialog}
            label='Learn More.'
            size='large'
            color='error'
            sx={{
              textDecoration: 'underline',
              py: 0,
              px: 0.75,
              mt: '-4px',
            }}
          />
        </CustomTypo>
      </Box>
      <ReturnPolicyDialog
        handleClose={handleCloseDialog}
        open={dialog.returnPolicy}
      />
      <BuyerProtection
        handleClose={handleCloseDialog}
        open={dialog.protetionPolicy}
      />
    </React.Fragment>
  );
};

export default Return_policy;
