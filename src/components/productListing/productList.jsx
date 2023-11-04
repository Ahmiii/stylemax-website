import { Box, styled } from '@mui/material';
import React from 'react';

const ProductList = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled(Box)(() => ({
  paddingLeft: '16px',
  display: 'grid',
  width: '100%',
  gridColumnGap: '1rem',
  gridRowGap: '3rem',
  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
}));

export default ProductList;
