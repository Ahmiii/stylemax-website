import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Skeleton,
  styled,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import CustomTypo from '../common/CustomTypo';
import { useLocation, useNavigate } from 'react-router-dom';
import CircleIcon from '@mui/icons-material/Circle';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart, getCart } from '../../store/slices/cart/extraReducers';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import authSlice from '../../store/slices/auth';
// import authSlice from '../../store/slices/auth/authSlice';

const ProductInfo = (props) => {
  let { id, description, details, label, stock, tags, brand, colours, sizes } =
    props.product;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user } = useSelector((st) => st.auth);
  const { cart, loading } = useSelector((st) => st.cart);
  const [prodStock, setProdStock] = useState(stock);

  description = description.split(',');
  details.tags = tags.join(', ');

  const handleAddToCart = () => {
    if (!user) dispatch(authSlice.actions.showNotLoggedInToast(true));
    // navigate(`/login?redirect=${location.pathname}`);
    else {
      dispatch(addItemsToCart({ product_id: id, quantity: 1 })).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          setProdStock(stock - 1);
          toast.success('Item added to cart');
        }
      });
    }
  };

  let currProdExist = cart?.cartItems?.filter((el) =>
    el?.product ? el?.product.id === id : el.product_id === id
  )?.[0];

  return (
    <React.Fragment>
      <Box display='flex' gap={1.5} flexDirection='column'>
        <CustomTypo variant='h3' fontFamily='KoHo'>
          {label}
        </CustomTypo>
        <CustomTypo fontFamily='KoHo' variant='h5' color='error'>
          {details.brand}
        </CustomTypo>
        <CustomTypo fontFamily='KoHo' variant='subtitle1'>
          Size : {sizes.map((el) => el.label)}
        </CustomTypo>
      </Box>
      <Box display='flex' gap={3} mt={7}>
        <CustomTypo fontFamily='KoHo' variant='h4'>
          ${details.offered_price}
        </CustomTypo>
        <CustomTypo
          fontFamily='KoHo'
          variant='h4'
          color='textSecondary'
          sx={{ textDecoration: 'line-through' }}
        >
          ${details.price}
        </CustomTypo>
      </Box>

      {currProdExist ? (
        <Box display='flex' gap={2} my={4}>
          <Button
            variant='contained'
            color='primary'
            size='large'
            sx={{ flex: 1, textTransform: 'uppercase' }}
            onClick={() => navigate('/cart')}
          >
            View Bag
          </Button>
          <Button
            variant='contained'
            color='primary'
            sx={{ flex: 1, textTransform: 'uppercase' }}
            onClick={() => navigate('/checkout')}
          >
            Checkout
          </Button>
        </Box>
      ) : stock === 0 ? (
        <Button
          variant='contained'
          color='error'
          size='large'
          sx={{ flex: 1, textTransform: 'uppercase' }}
          onClick={() => navigate('/cart')}
        >
          Sold
        </Button>
      ) : (
        <Button
          variant='contained'
          color='primary'
          size='large'
          sx={{ flex: 1, textTransform: 'uppercase' }}
          onClick={handleAddToCart}
          disabled={loading}
        >
          {loading ? <CircularProgress size={25.5} /> : 'Add To Cart'}
        </Button>
      )}

      <CustomTypo fontFamily='KoHo' variant='subtitle1'>
        Product Description
      </CustomTypo>

      <CustomTypo fontFamily='KoHo' variant='body1'>
        {description?.join('')}
      </CustomTypo>

      <Box mb={7}>
        <CustomTypo fontFamily='KoHo' variant='subtitle1'>
          Details
        </CustomTypo>
        <Box>
          <Box my={1} display='flex' justifyContent='space-between'>
            <CustomTypo fontFamily='KoHo' variant='body1'>
              Price
            </CustomTypo>
            <CustomTypo fontFamily='KoHo' variant='body1'>
              ${details.offered_price}
            </CustomTypo>
          </Box>
          <Box mb={1} display='flex' justifyContent='space-between'>
            <CustomTypo fontFamily='KoHo' variant='body1'>
              Size
            </CustomTypo>
            <CustomTypo fontFamily='KoHo' variant='body1'>
              {sizes.map((el) => el.label)}
            </CustomTypo>
          </Box>
          <Box mb={1} display='flex' justifyContent='space-between'>
            <CustomTypo fontFamily='KoHo' variant='body1'>
              Brand
            </CustomTypo>
            <CustomTypo fontFamily='KoHo' variant='body1'>
              {brand?.label ?? 'N/A'}
            </CustomTypo>
          </Box>
          <Box mb={1} display='flex' justifyContent='space-between'>
            <CustomTypo fontFamily='KoHo' variant='body1'>
              Condition
            </CustomTypo>
            <CustomTypo fontFamily='KoHo' variant='body1'>
              {details.condition}
            </CustomTypo>
          </Box>
          <Box mb={1} display='flex' justifyContent='space-between'>
            <CustomTypo fontFamily='KoHo' variant='body1'>
              Style
            </CustomTypo>
            <CustomTypo fontFamily='KoHo' variant='body1'>
              {details.style}
            </CustomTypo>
          </Box>
          <Box display='flex' justifyContent='space-between'>
            <CustomTypo fontFamily='KoHo' variant='body1'>
              Color
            </CustomTypo>
            <CustomTypo fontFamily='KoHo' variant='body1'>
              {colours.map((el) => el.label)}
            </CustomTypo>
          </Box>
          <Box display='flex' justifyContent='space-between'>
            <CustomTypo fontFamily='KoHo' variant='body1'>
              Stock
            </CustomTypo>
            <CustomTypo fontFamily='KoHo' variant='body1'>
              {prodStock}
            </CustomTypo>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

const DescBox = styled(Box)(({ theme }) => ({
  '& > *': {
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    paddingBlock: '0.4rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  '& div': {
    paddingLeft: '1rem',
  },
}));

export default ProductInfo;
