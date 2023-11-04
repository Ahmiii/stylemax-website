import { Avatar, Box, Button, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CustomTypo from '../common/CustomTypo';
import { useNavigate } from 'react-router-dom';
import { getCart } from '../../store/slices/cart/extraReducers';
import { useDispatch } from 'react-redux';
import { deleteMyCart, getMyCart } from '../../api/cart';

const Confirmation = ({ orderInfo }) => {
  console.log({orderInfo})
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getMyCart().then((res) => {
      deleteMyCart(res?.data?.id);
    });
  }, []);


  return (
    <React.Fragment>
      <Box px={3} py={4} display='flex' gap={2}>
        <Avatar
          sx={{
            background: (theme) => theme.palette.success.light,
            height: '30px',
            width: '30px',
            '& *': {
              fontSize: '1.2rem',
            },
          }}
        >
          <CheckOutlinedIcon />
        </Avatar>
        <Stack spacing={2}>
          <CustomTypo variant='h5' fontFamily='KoHo' color='secondary'>
            Thank you for your order!
          </CustomTypo>
          {orderInfo?.map((ord, ind) => {
            let { value } = ord;
            return (
              <Stack sx={{ mb: 2 }}>
                <CustomTypo variant='h6' fontFamily='KoHo' sx={{ mb: 1 }}>
                  Order {orderInfo.length > 1 ? ind + 1 : ''} Details
                </CustomTypo>

                <Stack direction='row' spacing={1}>
                  <CustomTypo variant='subtitle1' fontFamily='KoHo'>
                    Order id :
                  </CustomTypo>
                  <CustomTypo variant='body1' fontFamily='KoHo'>
                    {value.data.id}
                  </CustomTypo>
                </Stack>
                <Stack direction='row' spacing={1}>
                  <CustomTypo variant='subtitle1' fontFamily='KoHo'>
                    Product :
                  </CustomTypo>
                  <CustomTypo variant='body1' fontFamily='KoHo'>
                    {value.data.product.label}
                  </CustomTypo>
                </Stack>
                <Stack direction='row' spacing={3}>
                  <CustomTypo variant='subtitle1' fontFamily='KoHo'>
                    Amount paid :
                  </CustomTypo>
                  <CustomTypo variant='body1' fontFamily='KoHo'>
                    $
                    {value.data.final_price +
                      value.data.product.details.shipping_fee}
                  </CustomTypo>
                </Stack>
                <Stack direction='row' spacing={3}>
                  <CustomTypo variant='subtitle1' fontFamily='KoHo'>
                    Vendor :
                  </CustomTypo>
                  <CustomTypo variant='body1' fontFamily='KoHo'>
                    {value.data.vendor.firstName} {value.data.vendor.lastName}
                  </CustomTypo>
                </Stack>
                <Stack direction='row' spacing={3}>
                  <CustomTypo variant='subtitle1' fontFamily='KoHo'>
                    Shipping Address :
                  </CustomTypo>
                  <CustomTypo variant='body1' fontFamily='KoHo'>
                    {value.data.shippingAddress.firstname}{' '}
                    {value.data.shippingAddress.lastname},{' '}
                    {value.data.shippingAddress.address},{' '}
                    {value.data.shippingAddress.city},{' '}
                    {value.data.shippingAddress.state},{' '}
                    {value.data.shippingAddress.country}.
                  </CustomTypo>
                </Stack>
              </Stack>
            );
          })}
          <Stack>
            <Button
              variant='contained'
              color='primary'
              sx={{ minWidth: '220px', width: 'fit-content', mt: 2 }}
              onClick={() => {
                dispatch(getCart());
                navigate('/products');
              }}
            >
              Continue Shopping
            </Button>
          </Stack>
        </Stack>
      </Box>
    </React.Fragment>
  );
};

export default Confirmation;
