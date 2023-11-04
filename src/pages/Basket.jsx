import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomTypo from '../components/common/CustomTypo';
import Container from '../components/common/Container';
import BasketProducts from '../components/basket/products';
import Page from '../components/common/Page';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, remFromCart } from '../store/slices/cart/extraReducers';
import { toast } from 'react-toastify';
import SiteContentLoading from '../components/loader/SiteContentLoading';

function calculateTotal(cartItems, shipping) {
  let subTotal = cartItems?.reduce((total, cartItem) => {
    return (
      total + cartItem?.product?.details?.offered_price * cartItem?.quantity
    );
  }, 0);
  let total = subTotal + shipping;
  return { subTotal, total };
}

function calcTotalShipping(cartItems) {
  return cartItems?.reduce((total, cartItem) => {
    return total + cartItem?.product?.details?.shipping_fee;
  }, 0);
}
const Basket = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  
  const { user } = useSelector((st) => st.auth);
  const { cart } = useSelector((st) => st.cart);

  useEffect(() => {
    if (!user) return navigate(`/login`);
    dispatch(getCart())
      .then((res) => {
        // if (res.meta.requestStatus === 'fulfilled')
        setLoading(false);
      })
      .catch((er) => setLoading(false));
  }, [user]);

  const removeFromCart = (prodId) => {
    let val = {
      bodyVal: { product_id: prodId, quantity: 1 },
      cartId: cart?.id,
    };
    dispatch(remFromCart(val)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled')
        toast.success('Item removed from cart');
    });
  };

  if (loading) return <SiteContentLoading />;

  return (
    <Page title='StyleMax | View Bag'>
      <Container>
        <Box
          display='flex'
          alignItems='center'
          flexDirection='column'
          gap={1}
          mb={6}
        >
          <CustomTypo fontFamily='KoHo' variant='h3'>
            Your Basket
          </CustomTypo>
          <Link
            to='/products'
            sx={{
              color: (theme) => theme.palette.secondary.main,
              fontFamily: 'KoHo',
            }}
          >
            Continue Shopping
          </Link>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {cart && cart?.cartItems?.length > 0 ? (
              <BasketProducts
                handleRemove={removeFromCart}
                products={cart.cartItems}
              />
            ) : (
              <CustomTypo fontFamily='Jost' variant='h6'>
                Your cart is empty
              </CustomTypo>
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              size='large'
              sx={{ textTransform: 'uppercase', fontSize: '1.35rem' }}
              variant='contained'
              color='primary'
              fullWidth
              onClick={() => navigate('/checkout')}
              disabled={cart?.cartItems?.length === 0 || !cart}
            >
              Checkout
            </Button>
            <Box
              mt={6}
              px={2}
              py={1}
              sx={{
                outline: (theme) => `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box display='flex' justifyContent='center' gap={2}>
                <CustomTypo
                  fontFamily='KoHo'
                  variant='subtitle1'
                  fullWidth
                  sx={{ flex: 1, textAlign: 'right' }}
                >
                  Subtotal:
                </CustomTypo>
                <CustomTypo
                  fontFamily='KoHo'
                  variant='body1'
                  sx={{ flex: 1, textAlign: 'left' }}
                >
                  $
                  {cart?.cartItems && cart?.cartItems.length > 0
                    ? calculateTotal(cart?.cartItems, 20)?.subTotal
                    : '0'}
                </CustomTypo>
              </Box>
              <Box mt={1} display='flex' justifyContent='center' gap={2}>
                <CustomTypo
                  fontFamily='KoHo'
                  variant='subtitle1'
                  sx={{ flex: 1, textAlign: 'right' }}
                >
                  Shipping:
                </CustomTypo>
                <CustomTypo
                  fontFamily='KoHo'
                  variant='body1 '
                  sx={{ flex: 1, textAlign: 'left' }}
                >
                  ${calcTotalShipping(cart?.cartItems)}
                </CustomTypo>
              </Box>
              <Box mt={3} display='flex' justifyContent='center' gap={2}>
                <CustomTypo
                  fontFamily='KoHo'
                  variant='subtitle1'
                  sx={{ flex: 1, textAlign: 'right' }}
                >
                  Total:
                </CustomTypo>
                <CustomTypo
                  fontFamily='KoHo'
                  variant='subtitle1'
                  sx={{ flex: 1, textAlign: 'left' }}
                >
                  $
                  {cart?.cartItems && cart?.cartItems?.length > 0
                    ? calculateTotal(
                        cart?.cartItems,
                        calcTotalShipping(cart?.cartItems)
                      ).total
                    : '0'}
                </CustomTypo>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Basket;
