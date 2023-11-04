import { Box, CardActionArea, Skeleton } from '@mui/material';
import React from 'react';

const ProductCardSkel = () => {
  return (
    <CardActionArea display='flex' flexDirection='column' gap={2}>
      <Skeleton animation='wave' variant='rounded' width='100%' height={370} />
      <Skeleton animation='wave' variant='text' sx={{ fontSize: '2rem' }} />
      <Skeleton
        animation='wave'
        variant='text'
        sx={{ fontSize: '2rem' }}
        width='80%'
      />
      <Skeleton
        animation='wave'
        variant='text'
        sx={{ fontSize: '2rem' }}
        width='60%'
      />
    </CardActionArea>
  );
};

export default ProductCardSkel;
