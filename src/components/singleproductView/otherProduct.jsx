import {
  Box,
  Button,
  Card,
  CardActionArea,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Skeleton,
  styled,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomTypo from '../common/CustomTypo';

import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { useNavigate } from 'react-router-dom';
import { getProdBySelFilters } from '../../api/products';
import { useDispatch } from 'react-redux';
import { remoteUrl } from '../../api';
import { settings } from './similarCarouselSetting';
import Slider from 'react-slick';

const OtherProduct = ({ subCatId, subCatlabel, colors, styles, size }) => {
  const navigate = useNavigate();
  const [similarProducts, setSimilarProducts] = useState({
    loading: true,
    products: null,
  });

  const [find, setFind] = useState({
    size: '',
    color: '',
    style: '',
  });

  useEffect(() => {
    if (subCatId) {
      setSimilarProducts({ loading: true, products: null });
      getProdBySelFilters({ sub_category_id: [subCatId] })
        .then((res) => {
          const data = res.data;
          setSimilarProducts({
            loading: false,
            products: data.products,
          });
        })
        .catch((er) => {
          toast.error("Couldn't get the related products");
          setSimilarProducts({ loading: false, products: null });
        });
    }
  }, [subCatId]);

  const handleChange = (e) => {
    setFind((st) => ({ ...st, [e.target.name]: e.target.value }));
  };


  return (
    <React.Fragment>
      <Typography variant='h4' className='textUppercase' sx={{ mb: 1 }}>
        other {subCatlabel || 'Products'} you may like
      </Typography>
      {similarProducts.loading ? (
        <SliderRoot {...settings}>
          {Array(6)
            .fill()
            .map((_, idx) => (
              <Skeleton
                key={idx * 2}
                animation='wave'
                variant='rounded'
                height={185}
              />
            ))}
        </SliderRoot>
      ) : similarProducts?.products?.length > 0 &&
        similarProducts.products.filter(
          (el) => el.id !== +location.pathname.split('/').pop()
        ).length > 0 ? (
        <SliderRoot {...settings}>
          {similarProducts.products
            .filter((el) => el.id !== +location.pathname.split('/').pop())
            .map((el) => (
              <StyledCard
                key={el.id}
                imgUrl={`${remoteUrl}${el.pictures[0]}`}
                onClick={() => navigate(`/product/${el.id}`)}
              />
            ))}
        </SliderRoot>
      ) : (
        <CustomTypo
          fontFamily='Jost'
          variant='subtitle1'
          sx={{ textAlign: 'center', my: 5 }}
        >
          No similar items to show
        </CustomTypo>
      )}
      <Grid container spacing={2}></Grid>

      <Typography variant='h4' className='textUppercase' sx={{ mb: 1, mt: 9 }}>
        Find Similar Listing
      </Typography>
      <ListingBox>
        <Box display='flex' alignItems='center' gap={2}>
          <CustomTypo variant='body1' fontFamily='Jost'>
            By
          </CustomTypo>
          <FormControl>
            <Select
              labelId='product-view-size'
              id='demo-simple-select'
              name='style'
              value={find.style}
              displayEmpty
              size='small'
              onChange={handleChange}
              sx={{ backgroundColor: '#fff' }}
            >
              <MenuItem value='' disabled>
                Style
              </MenuItem>

              {styles?.map((i) => {
                return <MenuItem value={i.label}>{i.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Box>
        <Box display='flex' alignItems='center' gap={2}>
          <CustomTypo variant='body1' fontFamily='Jost'>
            By
          </CustomTypo>
          <FormControl>
            <Select
              labelId='product-view-size'
              id='demo-simple-select'
              name='size'
              value={find.size}
              displayEmpty
              size='small'
              onChange={handleChange}
              sx={{ backgroundColor: '#fff' }}
            >
              <MenuItem value='' disabled>
                Size
              </MenuItem>
              {size?.map((i) => {
                return <MenuItem value={i.label}>{i.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Box>
        <Box display='flex' alignItems='center' gap={2}>
          <CustomTypo variant='body1' fontFamily='Jost'>
            By
          </CustomTypo>
          <FormControl>
            <Select
              labelId='product-view-size'
              value={find.color}
              displayEmpty
              name='color'
              size='small'
              onChange={handleChange}
              sx={{ backgroundColor: '#fff' }}
            >
              <MenuItem value='' disabled>
                Colors
              </MenuItem>
              {colors?.map((i) => {
                return <MenuItem value={i?.label}>{i?.label}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Button
            variant='contained'
            color='primary'
            endIcon={<ChevronRightOutlinedIcon fontSize='small' />}
            size='large'
            onClick={() => {
              let params = '?';

              if (find.style) params += `style=${find.style}`;
              if (find.style) params += `style=${find.style}`;

              navigate(
                `/products/?${find.style && `style=${find.style}`}${
                  find.color && `&color=${find.color}`
                }${find.size && `&size=${find.size}`}`,
                { relative: false }
              );
            }}
          >
            Find
          </Button>
        </Box>
      </ListingBox>
    </React.Fragment>
  );
};

const StyledCard = styled(CardActionArea, {
  shouldForwardProp: (props) => props !== 'imgUrl',
})(({ imgUrl }) => ({
  background: `url(${imgUrl})`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  display: 'flex',
  flexDirection: 'column',
  color: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  alignText: 'center',
  height: '195px',
  backgroundRepeat: 'no-repeat',
  borderRadius: 12,
}));

const ListingBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '3rem',
  borderRadius: '10px',
  padding: '2rem',
  backgroundColor: theme.palette.grey[200],
}));

const SliderRoot = styled(Slider)(() => ({
  '& .slick-track': {
    marginLeft: 0,
  },
  '& .slick-track > *': {
    paddingInline: '5px !important',
  },
  '& .slick-list': {
    marginInline: '-5px',
  },
}));

export default OtherProduct;
