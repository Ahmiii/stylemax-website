import { Box, Button, Divider, TextField } from '@mui/material';
import React from 'react';
import CustomTypo from '../common/CustomTypo';
import CheckoutProd from './checkoutProd';
import { getSECURE_API } from '../../api';
import { toast } from 'react-toastify';

function calculateTotal(cartItems, shipping, promo = 0) {
  let subTotal = cartItems?.reduce((total, cartItem) => {
    return (
      total + cartItem?.product?.details?.offered_price * cartItem?.quantity
    );
  }, 0);
  let total = subTotal + shipping - promo * cartItems.length;
  return { subTotal, total };
}

const CheckoutProdGrid = ({ products, sendPromoCode }) => {
  const [promoCode, setPromoCode] = React.useState('');
  const [promoDiscount, setPromoDiscount] = React.useState(0);
  const SECURE_API = getSECURE_API();
  
  async function handlePromoCode() {
    try {
      const res = await SECURE_API.post('/order/promo', { code: promoCode });

      if (res.status == 200) {
        sendPromoCode(promoCode);
        setPromoDiscount(res.data.discount);
        toast.success('Promo Code Applied');
        return;
      }
    } catch (error) {
      setPromoDiscount(0);
      toast.error('Invalid Promo Code');
    }
  }

  const price = React.useMemo(() => {
    return calculateTotal(
      products,
      products &&
        products
          .map((el) => el?.product?.details?.shipping_fee)
          .reduce((a, b) => a + b, 0),
      Number(promoDiscount) ?? 0
    );
  }, [promoDiscount, products]);


  return (
    <React.Fragment>
      <Box
        height='100%'
        sx={{
          outline: (theme) => `1px solid ${theme.palette.divider}`,
        }}
        py={3}
        display='flex'
        flexDirection='column'
        gap={3}
      >
        {products &&
          products.length > 0 &&
          products?.map((el, ind) => (
            <React.Fragment key={el?._id}>
              <CheckoutProd prod={el.product} />
              {ind < products?.length - 1 && (
                <Box px={3}>
                  <Divider />
                </Box>
              )}
            </React.Fragment>
          ))}
        <Box
          sx={{ backgroundColor: (theme) => theme.palette.grey[300] }}
          p={2}
          mt={2}
          display='flex'
          gap={2}
          //   alignItems='stretch'
        >
          <TextField
            name='promoCode'
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder='Promo / Gift Code'
            sx={{ '& input': { backgroundColor: '#fff' }, flex: 2 }}
          />
          <Button
            variant='contained'
            color='primary'
            size='large'
            sx={{ height: 'inherit', flex: 1 }}
            onClick={handlePromoCode}
          >
            APPLY
          </Button>
        </Box>
        <Box>
          <Box mt={3} display='flex' justifyContent='center' gap={2}>
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
              {price ? `$${price.subTotal}` : '0'}
            </CustomTypo>
          </Box>
          {promoDiscount != 0 && (
            <Box mt={1} display='flex' justifyContent='center' gap={2}>
              <CustomTypo
                fontFamily='KoHo'
                variant='subtitle1'
                fullWidth
                sx={{ flex: 1, textAlign: 'right' }}
              >
                Promo Discount:
              </CustomTypo>
              <CustomTypo
                fontFamily='KoHo'
                variant='body1'
                sx={{ flex: 1, textAlign: 'left' }}
              >
                {`- $${promoDiscount * products?.length}`}
              </CustomTypo>
            </Box>
          )}
          <Box mt={1} display='flex' justifyContent='center' gap={2}>
            <CustomTypo
              fontFamily='KoHo'
              variant='subtitle1'
              fullWidth
              sx={{ flex: 1, textAlign: 'right' }}
            >
              Shipping:
            </CustomTypo>
            <CustomTypo
              fontFamily='KoHo'
              variant='body1'
              sx={{ flex: 1, textAlign: 'left' }}
            >
              $
              {products &&
                products
                  .map((el) => el?.product?.details?.shipping_fee)
                  .reduce((a, b) => a + b, 0)}
            </CustomTypo>
          </Box>
        </Box>
        <Box px={3}>
          <Divider />
        </Box>
        <Box display='flex' justifyContent='center' gap={2}>
          <CustomTypo
            fontFamily='KoHo'
            variant='h6'
            fullWidth
            color='error'
            sx={{ flex: 1, textAlign: 'right' }}
          >
            Total:
          </CustomTypo>
          <CustomTypo
            fontFamily='KoHo'
            variant='h6'
            color='error'
            sx={{ flex: 1, textAlign: 'left' }}
          >
            ${price ? price.total : '0'}
          </CustomTypo>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default CheckoutProdGrid;
