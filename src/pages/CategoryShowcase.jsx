import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  styled,
} from '@mui/material';
import React, { useEffect } from 'react';
import CustomTypo from '../components/common/CustomTypo';
import Page from '../components/common/Page';

import marketing from '../assets/images/marketing.png';

import nightout from '../assets/images/nightout.png';
import office from '../assets/images/office.png';
import curtural from '../assets/images/curtural.png';

import Slider from 'react-slick';
import CategoryCard from '../components/cards/CategoryCard';
import { settings } from '../components/cards/cardCarouselSettings';
import ProductCard from '../components/cards/ProductCard';
import { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BrandCarousel from '../components/brandCarousel';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { remoteUrl } from '../api';
import { getProductByCategory } from '../api/products';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import queryString from 'query-string';
import { extendQueryParams } from '../utils/filterMethods';
import SiteContentLoading from '../components/loader/SiteContentLoading';
import API_URL, { END_POINTS } from '../config';

const shopByStyleList = [
  {
    title: 'FORMAL',
    imgUrl: nightout,
    category: 'nightout',
    url: 'Formal',
  },
  {
    title: 'CASUAL',
    imgUrl: office,
    category: 'office',
    url: 'Casual',
  },

  {
    title: 'CULTURAL',
    imgUrl: curtural,
    category: 'cultural',
    url: 'Cultural',
  },
];

function groupById(arr) {
  return arr.map((obj) => {
    let group = [];
    obj.subCategories.forEach((subCat) => {
      if (subCat.parent_subcategory) {
        let checkAlreadyExist = group.find(
          (e) => e.id === subCat.parent_subcategory.id
        );
        if (checkAlreadyExist) checkAlreadyExist.subCategories.push(subCat);
        else
          group.push({ ...subCat.parent_subcategory, subCategories: [subCat] });
      }
    });

    return { ...obj, subCategories: group };
  });
}

const CategoryShowcase = () => {
  const { categories } = useSelector((st) => st.category);
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [find, setFind] = useState({
    shop: 'Dresses',
    under: 80,
  });
  const [catProducts, setCatProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [dropdownList, setDropdownList] = useState(null);

  const handleChange = (e) => {
    console.log('e.target.value', e.target.value);
    setFind((st) => ({ ...st, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    let query = new URLSearchParams(location.search).get('category');
    if (!query || !categories) return;

    let getCategory = categories?.filter(
      (el) => el.label.toLowerCase() === query.toLowerCase()
    )[0];
    getCategories(getCategory.id);
    getNewArrivals(getCategory.id);
    getBestSellers(getCategory.id);

    let subCat = groupById([getCategory])[0].subCategories?.sort((a, b) =>
      a.label.localeCompare(b.label)
    );
    console.log('subCat', subCat);
    setDropdownList(subCat);
    setFind((st) => ({ ...st, shop: subCat[0].id }));
  }, [location, categories]);

  const getCategories = (catId) => {
    getProductByCategory(catId)
      .then((response) => setCatProducts(response.data))
      .catch((error) => toast.error(error))
      .finally(() => setLoading(false));
  };

  function navigateShopNow(category) {
    const url = `/products?category=${category.id}&sub_category=${find.shop}&price=0%2C${find.under}`;
    navigate(url);
  }

  const getNewArrivals = (id) => {
    if (id) {
      axios
        .get(API_URL + END_POINTS.products, {
          params: { sort_type: 'date_asc' },
        })
        .then((res) => {
          setNewArrivals(res.data.products);
        });
    }
  };

  const getBestSellers = (id) => {
    if (id) {
      axios
        .get(API_URL + END_POINTS.products + END_POINTS.bestSellers)
        .then((res) => {
          setBestSellers(res.data);
        });
    }
  };

  if (loading) return <SiteContentLoading />;

  let category = categories?.filter(
    (el) =>
      el.label.toLowerCase() === searchParams?.get('category')?.toLowerCase()
  )[0];

  return (
    <React.Fragment>
      <Page title='StyleMax | Category Showcase'>
        <ContainerExt>
          <Box>
            <CustomTypo variant='h5' fontFamily='KoHo' sx={{ mx: 3 }}>
              SHOP BY CATEGORY
            </CustomTypo>

            <SliderRoot {...settings}>
              {category.subCategories
                .filter((ele) => ele.parent_subcategory === null)
                .map((prod) => (
                  <CategoryCard
                    key={prod.id}
                    title={prod.label}
                    imgUrl={`${remoteUrl}${prod.picture}`}
                    category={searchParams?.get('category')}
                    handleClick={() => {
                      const query = queryString.stringify(
                        { sub_category: prod.id },
                        {
                          arrayFormat: 'separator',
                          arrayFormatSeparator: ',',
                        }
                      );
                      const extendedUrl = extendQueryParams(
                        location.href.split('?')[0],
                        query
                      );
                      navigate(
                        `/products?category=${category.id}&${
                          extendedUrl.split('?')[1]
                        }`
                      );
                    }}
                  />
                ))}
            </SliderRoot>
            {/* <SliderRoot {...settings}>
              {categories
                ?.filter(
                  (el) =>
                    el.label.toLowerCase() ===
                    searchParams?.get('category')?.toLowerCase()
                )[0]
                .subCategories.filter(
                  (ele) =>
                    ele.parent_subcategory === null && (
                      <CategoryCard
                        key={ele.id}
                        title={ele.label}
                        imgUrl={ele.picture}
                        category={searchParams?.get('category')}
                        subcategory={'amaxon'}
                      />
                    )
                )}
              {categoriesCards.map((card, _) => (
                <CategoryCard
                  key={card.title}
                  title={card.title}
                  imgUrl={card.imgUrl}
                  category={card.category}
                  subcategory={card.subcategory}
                />
              ))}
            </SliderRoot> */}
          </Box>
        </ContainerExt>
        {/* Marketing Message */}
        <Box
          sx={{
            backgroundColor: (theme) => theme.custom.lightBack,
            mt: 5,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 4,
              maxWidth: '1400px',
              marginInline: 'auto',
            }}
          >
            <Box flexBasis='50%' sx={{ objectFit: 'contain' }}>
              <img
                src={marketing}
                width='100%'
                height='100%'
                style={{ borderRadius: '10px' }}
              />
            </Box>
            <Box
              px={4}
              flexBasis='50%'
              display='flex'
              flexDirection='column'
              justifyContent='center'
              gap={3}
              py={2}
            >
              <CustomTypo
                variant='h3'
                fontFamily='Jost'
                sx={{ fontWeight: 800, letterSpacing: '-2px' }}
              >
                MARKETING MESSAGE
              </CustomTypo>
              <CustomTypo variant='body1' fontFamily='Jost'>
                We can write anything here related to marketing or use this
                space for branding some brands.
              </CustomTypo>
              <Button
                variant='contained'
                color='primary'
                size='large'
                sx={{ maxWidth: '160px', minHeight: '50px' }}
                onClick={() => navigate(`/products?category=${category.id}`)}
              >
                Shop Now
              </Button>
            </Box>
          </Box>
          {/* Shop best Sellers */}
        </Box>
        <ContainerExt mt={5}>
          <Box>
            <CustomTypo variant='h5' fontFamily='KoHo' sx={{ mx: 3 }}>
              SHOP BESTSELLERS
            </CustomTypo>
            <SliderRoot {...settings}>
              {bestSellers
                .filter((prod) => prod?.pictures?.length > 0)
                .map((product, _) => (
                  <ProductCard
                    type={1}
                    key={product.id}
                    product={product}
                    prodImage={product.pictures[0]}
                  />
                ))}
            </SliderRoot>
          </Box>
          <Box my={3}>
            <CustomTypo
              variant='h5'
              fontFamily='KoHo'
              sx={{ mx: 3, mb: 1, textAlign: 'center' }}
              fullWidth
            >
              SHOP BY PRICE
            </CustomTypo>
            <ListingBox maxWidth='800px' mx='auto'>
              <Box display='flex' alignItems='center' gap={2}>
                <CustomTypo variant='body1' fontFamily='Jost'>
                  Shop
                </CustomTypo>
                <FormControl>
                  <Select
                    labelId='product-view-size'
                    id='demo-simple-select'
                    value={find.shop}
                    name='shop'
                    size='small'
                    onChange={handleChange}
                    defaultValue={dropdownList?.[0]}
                    sx={{ backgroundColor: '#fff' }}
                  >
                    {dropdownList?.map((prod) => {
                      return <MenuItem value={prod.id}>{prod.label}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </Box>
              <Box display='flex' alignItems='center' gap={2}>
                <CustomTypo variant='body1' fontFamily='Jost'>
                  Under
                </CustomTypo>
                <FormControl>
                  <Select
                    labelId='product-view-size'
                    id='demo-simple-select'
                    name='under'
                    value={find.under}
                    defaultValue={80}
                    size='small'
                    onChange={handleChange}
                    sx={{ backgroundColor: '#fff' }}
                  >
                    <MenuItem value={80}>$80</MenuItem>
                    <MenuItem value={100}>$100</MenuItem>
                    <MenuItem value={200}>$200</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Button
                variant='contained'
                color='primary'
                size='large'
                endIcon={<ArrowForwardIosIcon />}
                onClick={() => navigateShopNow(category)}
              >
                Shop Now
              </Button>
            </ListingBox>
          </Box>
          {/* New Arrivals */}
          <Box>
            <CustomTypo variant='h5' fontFamily='KoHo' sx={{ mx: 3 }}>
              NEW ARRIVALS
            </CustomTypo>
            <SliderRoot {...settings}>
              {newArrivals
                .filter((prod) => prod?.pictures?.length > 0)
                .map((product, _) => (
                  <ProductCard
                    type={1}
                    key={product.id}
                    product={product}
                    prodImage={product.pictures[0]}
                  />
                ))}
            </SliderRoot>
          </Box>
          {/* Shop by Style */}
          <Box>
            <CustomTypo variant='h5' fontFamily='KoHo' sx={{ mx: 3 }}>
              SHOP BY STYLE
            </CustomTypo>
            <Grid container spacing={1}>
              {shopByStyleList.map((card, _) => (
                <Grid item xs={12} sm={6} md={3} key={card.imgUrl}>
                  <CategoryCard
                    key={card.title}
                    title={card.title}
                    imgUrl={card.imgUrl}
                    category={card.category}
                    subcategory={card.subcategory}
                    handleClick={() =>
                      navigate(
                        `/products?category=${category.id}&style=${card.url}`
                      )
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          {/* brands */}
          <Box>
            <CustomTypo variant='h5' fontFamily='KoHo' sx={{ mx: 3 }}>
              SHOP BY BRAND
            </CustomTypo>
            <BrandCarousel />
          </Box>
        </ContainerExt>
      </Page>
    </React.Fragment>
  );
};

const ContainerExt = styled(Box)(() => ({
  maxWidth: '1400px',
  marginInline: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '5rem',
  justifyContent: 'center',
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

const ListingBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '3rem',
  borderRadius: '10px',
  padding: '2rem',
  backgroundColor: theme.custom.lightBack,
}));

export default CategoryShowcase;
