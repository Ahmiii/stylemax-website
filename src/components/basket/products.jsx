import { Avatar, Box, Button, Divider, IconButton } from '@mui/material';
import React from 'react';
import CustomTypo from '../common/CustomTypo';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import API_URL from '../../config';

const BasketProducts = ({ handleRemove, products }) => {
  return (
    <Box display='flex' flexDirection='column' gap={4}>
      {products?.map((el, ind) => (
        <React.Fragment key={el.product.id}>
          <Box display='flex' flex={1} gap={5} key={el.product.id}>
            <Avatar
              variant='rounded'
              src={`${API_URL}${el.product.pictures[0]}`}
              alt={el.product.label}
              sx={{
                flex: 1,
                width: '100%',
                height: 'fit-content',
                objectFit: 'contain',
                maxWidth: '140px',
                alignSelf: 'center',
              }}
            />
            <Box flex={2}>
              <CustomTypo variant='h4' fontFamily='KoHo' sx={{ mb: 2 }}>
                {el.product.label}
              </CustomTypo>

              <Box display='flex' gap={4} mb={1}>
                <CustomTypo
                  variant='body1'
                  fontFamily='KoHo'
                  sx={{ minWidth: '70px' }}
                >
                  Price
                </CustomTypo>
                <CustomTypo
                  variant='body1'
                  fontFamily='KoHo'
                  sx={{ minWidth: '70px' }}
                >
                  ${el?.product?.details?.offered_price}
                </CustomTypo>
              </Box>
              <Box display='flex' gap={4} mb={1}>
                <CustomTypo
                  variant='body1'
                  fontFamily='KoHo'
                  sx={{ minWidth: '70px' }}
                >
                  Brand
                </CustomTypo>
                <CustomTypo
                  variant='body1'
                  fontFamily='KoHo'
                  sx={{ minWidth: '70px' }}
                >
                  {el.product.brand.label}
                </CustomTypo>
              </Box>
              <Box display='flex' gap={4} mb={1}>
                <CustomTypo
                  variant='body1'
                  fontFamily='KoHo'
                  sx={{ minWidth: '70px' }}
                >
                  Condition
                </CustomTypo>
                <CustomTypo
                  variant='body1'
                  fontFamily='KoHo'
                  sx={{ minWidth: '70px' }}
                >
                  {el?.product?.details?.condition}
                </CustomTypo>
              </Box>
              <Box display='flex' gap={4} mb={1}>
                <CustomTypo
                  variant='body1'
                  fontFamily='KoHo'
                  sx={{ minWidth: '70px' }}
                >
                  Style
                </CustomTypo>
                <CustomTypo
                  variant='body1'
                  fontFamily='KoHo'
                  sx={{ minWidth: '70px' }}
                >
                  {el?.product?.details?.style || '-'}
                </CustomTypo>
              </Box>
              <Box display='flex' gap={4}>
                <CustomTypo
                  variant='body1'
                  fontFamily='KoHo'
                  sx={{ minWidth: '70px' }}
                >
                  Shipping
                </CustomTypo>
                <CustomTypo
                  variant='body1'
                  fontFamily='KoHo'
                  sx={{ minWidth: '70px' }}
                >
                  ${el?.product?.details?.shipping_fee || '0'}
                </CustomTypo>
              </Box>
            </Box>
            <Box>
              <IconButton
                size='large'
                onClick={() => handleRemove(el.product.id)}
              >
                <CloseOutlinedIcon />
              </IconButton>
            </Box>
          </Box>
          {ind < products.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default BasketProducts;
