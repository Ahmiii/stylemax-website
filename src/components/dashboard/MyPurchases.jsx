import { Box, Button } from '@mui/material';
import React from 'react';
import PurchasesTable from '../../tables/myPurchases';
import { CardWrapper } from '../common/CardWrapper';
import CustomTypo from '../common/CustomTypo';
import { purchasedItems } from './data';
import ProductCardNonEdit from './ProductCard';

const MyPurchases = () => {
  return (
    <React.Fragment>
      <Box display='flex' flexDirection='column' justifyContent='end' gap={4}>
        <CustomTypo fontFamily='KoHo' variant='h4'>
          Purchased Items
        </CustomTypo>
        <PurchasesTable />
      </Box>
    </React.Fragment>
  );
};

export default MyPurchases;
