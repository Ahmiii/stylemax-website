import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Typography,
  Card,
  Box,
  CardActionArea,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { Favorite, FavoriteBorder } from '@mui/icons-material';

import {
  addProdToFav,
  remProdToFav,
} from '../../store/slices/favourite/extraReducers';
import { toast } from 'react-toastify';
import API_URL from '../../config';

const isFav = (id, arr) => {
  let res = arr.find((el) => el.product.id === id);
  if (res) return true;
  return false;
};

function ProductCard({ product, prodImage, type = 0 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { favorites, loading } = useSelector((st) => st.favorite);

  const handleFavClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    isFav(product.id, favorites)
      ? dispatch(remProdToFav(product)).then((res) => {
          if (res.meta.requestStatus === 'fulfilled')
            toast.success('Item removed from your wishlist');
        })
      : dispatch(addProdToFav(product)).then((res) => {
          if (res.meta.requestStatus === 'fulfilled')
            toast.success('Item added to wishlist');
        });
  };

  const StyledCard = styled(Card)({
    background: `url(${type === 0 ? prodImage : API_URL + prodImage})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    height: '400px',
    position: 'relative',
    backgroundRepeat: 'no-repeat',
  });

  return (
    <>
      <CardActionArea
        disableRipple
        onClick={() =>
          navigate(`/product/${product.id}`, { state: { product } })
        }
      >
        <StyledCard>
          <IconButton
            sx={{ position: 'absolute', top: '6px', right: '4px' }}
            onClick={handleFavClick}
            disabled={loading}
          >
            {favorites &&
            favorites.length > 0 &&
            isFav(product.id, favorites) ? (
              <Favorite sx={{ color: '#535C3D' }} />
            ) : (
              <FavoriteBorder sx={{ color: '#535C3D' }} />
            )}
          </IconButton>
        </StyledCard>

        <Typography variant='h4' component='h2' align='center' marginY={'5%'}>
          {product?.brand?.label}
        </Typography>
        <Typography
          fontSize={24}
          fontWeight={400}
          align='center'
          marginY={'4%'}
        >
          {product.label}
        </Typography>
        <Typography
          fontSize={24}
          fontWeight={400}
          align='center'
          marginY={'1%'}
        >
          Size: {product?.sizes && product?.sizes[0]?.label}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10%',
          }}
        >
          <Typography variant='h3' component='h2'>
            ${product?.details?.offered_price}
          </Typography>
          <Typography
            fontSize={24}
            fontWeight={400}
            color={'#AFACAC'}
            sx={{ textDecoration: 'line-through' }}
          >
            ${product?.details?.price}
          </Typography>
        </Box>
      </CardActionArea>
    </>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object,
};

export default ProductCard;
