import {
  Typography,
  Card,
  Button,
  Box,
  CardActionArea,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

import { Favorite, FavoriteBorder } from '@mui/icons-material';
import API_URL from '../../config';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CustomTypo from '../common/CustomTypo';

import CancelIcon from '@mui/icons-material/Cancel';

function ProductCardNonEdit({ product, prodImage, removeProd = true }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const handleProdClick = (e) => {
    e.stopPropagation();
    setLiked((st) => !st);
  };

  const StyledCard = styled(Card)({
    background: `url(${prodImage})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    height: '300px',
    position: 'relative',
    backgroundRepeat: 'no-repeat',
  });

  return (
    <>
      <CardActionArea
        disableRipple
        // onClick={() =>
        //   navigate(`/product/${product.id}`, { state: { product } })
        // }
      >
        {removeProd ? (
          <StyledCard>
            <IconButton
              sx={{ position: 'absolute', top: '6px', right: '4px', p: 0 }}
              onClick={handleProdClick}
            >
              <CancelIcon fontSize='large' color='error' />
            </IconButton>
          </StyledCard>
        ) : (
          <StyledCard />
        )}
        <CustomTypo
          fontFamily='Jost'
          variant='h5'
          sx={{ textAlign: 'center', mt: 3, textTransform: 'uppercase' }}
        >
          {product.brand.label}
        </CustomTypo>
        <CustomTypo
          fontFamily='Jost'
          variant='h4'
          sx={{ textAlign: 'center', fontWeight: 500, my: 1 }}
        >
          {product.label}
        </CustomTypo>
        <CustomTypo
          fontFamily='Jost'
          variant='h4'
          component='h5'
          sx={{ textAlign: 'center', fontWeight: 500, my: 1 }}
        >
          Size: {product.details.size}
        </CustomTypo>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10%',
            my: 1,
          }}
        >
          <CustomTypo fontFamily='Jost' variant='h3' component='h2'>
            ${product.details.offered_price}
          </CustomTypo>
          <CustomTypo
            fontFamily='Jost'
            variant='h4'
            component='h2'
            color='textSecondary'
            sx={{ textDecoration: 'line-through', fontWeight: 500 }}
          >
            ${product.details.price}
          </CustomTypo>
        </Box>
      </CardActionArea>
    </>
  );
}

ProductCardNonEdit.propTypes = {
  product: PropTypes.object,
};

export default ProductCardNonEdit;
