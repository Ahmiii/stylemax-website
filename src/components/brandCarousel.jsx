import React, { useState } from 'react';
import { Box, CardMedia, styled } from '@mui/material';
import Slider from 'react-slick';

import { SampleNextArrow, SamplePrevArrow } from './common/slickCarouselArrows';

import SvgImg from './common/SvgImg';

import adidas from '../assets/brands/adidas.svg';
import chanel from '../assets/brands/chanel.svg';
import zara from '../assets/brands/zara.svg';
import dior from '../assets/brands/dior.svg';
import mango from '../assets/brands/mango.svg';
import API_URL, { END_POINTS } from '../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { settings } from './singleproductView/similarCarouselSetting';

const brands = [
  {
    img: adidas,
    name: 'adidas',
  },
  {
    img: chanel,
    name: 'chanel',
  },
  {
    img: zara,
    name: 'zara',
  },
  {
    img: mango,
    name: 'mango',
  },
  {
    img: dior,
    name: 'dior',
  },
];

const SliderRoot = styled(Slider)(() => ({
  '& .slick-track > *': {
    paddingInline: '5px !important',
  },
  '& .slick-list': {
    marginInline: '-5px',
  },
}));

const BrandCarousel = () => {
  const [brandsData, setBrandsData] = useState([]);

  const navigate = useNavigate();

  useState(() => {
    axios.get(API_URL + END_POINTS.brands).then((res) => {
      setBrandsData(res.data);
    });
  }, []);

  return (
    <Box sx={{ backgroundColor: (theme) => theme.custom.lightBack }}>
      <Box width='90%' mx='auto'>
        <SliderRoot {...settings}>
          {brandsData.map((brand) =>
            brand.logo && brand.logo.split('.')[1] === 'png' ? (
              <Box
                // px={2}
                height='100px'
                sx={{
                  display: 'block !important',
                  objectFit: 'contain',
                  maxWidth: '120px',
                  marginInline: 'auto',
                }}
              >
                <CardMedia
                  image={API_URL + brand.logo}
                  data-image={API_URL + brand.logo}
                  style={{ height: 'inherit' }}
                  sx={{
                    cursor: 'pointer',
                    backgroundSize: 'contain',
                  }}
                  onClick={() => {
                    navigate('/products/?brand=' + brand.label);
                  }}
                />
              </Box>
            ) : (
              <Box
                // px={2}
                height='100px'
                sx={{
                  display: 'flex !important',
                  alignItems: 'center',
                  justifyContent: 'center',
                  objectFit: 'contain',
                  maxWidth: '120px',
                  marginInline: 'auto',
                  fontSize: '1.4rem',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  navigate('/products/?brand=' + brand.label);
                }}
              >
                {brand.label}
              </Box>
            )
          )}
        </SliderRoot>
      </Box>
    </Box>
  );
};

export default BrandCarousel;
