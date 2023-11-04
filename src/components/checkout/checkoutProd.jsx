import { Avatar, Box } from '@mui/material';
import React from 'react';
import { remoteUrl } from '../../api';
import CustomTypo from '../common/CustomTypo';

const CheckoutProd = ({ prod }) => {
  if (!prod) return <></>;

  const { pictures, details, label, brand } = prod;

  return (
    <Box display='flex' gap={2}>
      <Avatar
        variant='rounded'
        src={`${remoteUrl}${pictures[0]}`}
        sx={{
          width: '100%',
          height: 'fit-content',
          objectFit: 'contain',
          maxWidth: '90px',
          alignSelf: 'center',
        }}
      />
      <Box>
        <CustomTypo fontFamily='KoHo' variant='h5'>
          {label}
        </CustomTypo>

        <Box display='flex' mb={1} gap={1}>
          <CustomTypo
            fontFamily='KoHo'
            variant='body2'
            sx={{ minWidth: '70px' }}
          >
            Price
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body2'>
            {details?.offered_price}
          </CustomTypo>
        </Box>
        <Box display='flex' mb={1} gap={1}>
          <CustomTypo
            fontFamily='KoHo'
            variant='body2'
            sx={{ minWidth: '70px' }}
          >
            Brand
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body2'>
            {brand?.label}
          </CustomTypo>
        </Box>
        <Box display='flex' mb={1} gap={1}>
          <CustomTypo
            fontFamily='KoHo'
            variant='body2'
            sx={{ minWidth: '70px' }}
          >
            Condition
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body2'>
            {details?.condition}
          </CustomTypo>
        </Box>
        <Box display='flex' mb={1} gap={1}>
          <CustomTypo
            fontFamily='KoHo'
            variant='body2'
            sx={{ minWidth: '70px' }}
          >
            Style
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body2'>
            {details?.style}
          </CustomTypo>
        </Box>
        <Box display='flex' gap={1}>
          <CustomTypo
            fontFamily='KoHo'
            variant='body2'
            sx={{ minWidth: '70px' }}
          >
            Shipping
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body2'>
            ${details?.shipping_fee || '0'}
          </CustomTypo>
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutProd;
