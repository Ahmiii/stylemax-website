import { Box } from '@mui/material';
import React from 'react';
import MyLikesTable from '../../tables/myLikes';
import { CardWrapper } from '../common/CardWrapper';
import CustomTypo from '../common/CustomTypo';
import { likedProd, saleProducts } from './data';
import ProductCardNonEdit from './ProductCard';

const MyLikes = () => {
  return (
    <React.Fragment>
      <Box display='flex' flexDirection='column' justifyContent='end' gap={4}>
        <CustomTypo fontFamily='KoHo' variant='h4'>
          Liked Items
        </CustomTypo>
        <MyLikesTable />
        {/* <CardWrapper>
          {likedProd.map((el) => (
            <ProductCardNonEdit
              key={el.id}
              product={el}
              prodImage={el.pictures[0]}
            />
          ))}
        </CardWrapper> */}
      </Box>
    </React.Fragment>
  );
};

export default MyLikes;
