import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  Grid,
  Typography,
  Button,
  Box,
  MenuItem,
  Select,
  Paper,
  InputLabel,
  CircularProgress,
} from '@mui/material';

import Container from '../components/common/Container';
import Page from '../components/common/Page';
import ProductCard from '../components/cards/ProductCard';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import FilterSideMenu from '../components/productListing/filterMenu';
import ProductList from '../components/productListing/productList';
import BrandFilter from '../components/listingFilters/brandFilter';
import ColorFilter from '../components/listingFilters/colorFilter';
import StyleFilter from '../components/listingFilters/styleFilter';
import ShippingFilter from '../components/listingFilters/shippingFilter';
import ConditionFilter from '../components/listingFilters/conditionFilter';
import PriceFilter from '../components/listingFilters/priceFilter';
import RemoveFilter from '../components/listingFilters/removeFilter';
import ProductCardSkel from '../components/skeletons/ProductCardSkel';

import API_URL from '../config';
import { condition } from '../utils/sitefilters';
import { getFilteredLocation } from '../utils/filterMethods';

import { getProdBySelFilters } from '../api/products';
import ProductListingTitle from '../components/productListing/productListingTitle';
import CustomTypo from '../components/common/CustomTypo';

function ProductListing() {
  const { brands } = useSelector((st) => st.brand);
  const { categories } = useSelector((st) => st.category);
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [colors, setColors] = useState([]);
  // const [sub_category_id, setSub_category_id] = useState(-1);

  const [sortByFilter, setSortByFilter] = useState('date_desc');
  const [products, setProducts] = useState({
    products: [],
    page: 1,
    limit: 10,
    total: 0,
    colors: [],
  });

  let { filteredQueryParams } = getFilteredLocation(location, []);
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');

  useEffect(() => {
    let params = filteredQueryParams;
    setProducts({
      products: [],
      page: 1,
      limit: 10,
      total: 0,
      colors: [],
    });
    setLoading(true);
    getProducts(params);
  }, [location.search, sortByFilter, categories]);

  const getProducts = (params) => {
    params.sort_type = sortByFilter;
    console.log('params', params);
    if (Object.keys(params).length > 0) {
      if (params.category) {
        if (!categories) return;
        let selectedCat = categories?.filter((el) => el.id === +category)[0]
          ?.label;
        params = { ...params, filter: selectedCat.toLowerCase() };
        delete params.category;
      }
      if (params.sub_category) {
        if (!categories) return;
        let selectedCat = category
          ? categories?.filter((el) => el.id === +category)
          : categories;

        setColors(
          selectedCat[0]?.subCategories?.filter(
            (ele) => ele.id === +params.sub_category
          )[0]?.colours
        );

        params.sub_category_id = [+params.sub_category];
        delete params.sub_category;
      }

      if (params.hasOwnProperty('price'))
        params = {
          ...params,
          price: {
            min: +params.price.split(',')[0],
            max: +params.price.split(',')[1],
          },
        };
      if (params.hasOwnProperty('brand')) {
        let splitBrnd = params.brand.split(',');
        let res = brands
          .filter((el) => splitBrnd.includes(el.label.toLowerCase()))
          .map((el) => el.id);
        params = {
          ...params,
          brand: res,
        };
      }
      if (params.hasOwnProperty('colour'))
        params = {
          ...params,
          colour: params.colour.split(','),
        };

      if (params.hasOwnProperty('style'))
        params = { ...params, style: [params.style] };
    }

    getProdBySelFilters(params)
      .then((res) => {
        const data = res.data;
        console.log('filteredQueryParams', filteredQueryParams);
        // if (filteredQueryParams.sub_category_id) {
        //   console.log('in sucess sub cat');
        //   if (!sub_category_id !== -1) {
        //     if (+sub_category_id !== +filteredQueryParams.sub_category_id)
        //       setColors(data.colors);
        //   } else setColors(data.colors);
        // } else {
        if (!params.hasOwnProperty('colour')) {
          console.log('in else if section');
          setColors(data.colors);
          // }
        }

        setProducts((prevProducts) => {
          const mergedProducts = prevProducts.products.concat(data.products);
          const uniqueProducts = mergedProducts.filter(
            (product, index, self) =>
              index === self.findIndex((p) => p.id === product.id)
          );
          return {
            products: uniqueProducts,
            page: data.page,
            limit: 10,
            total: data.total,
            colors: data.colors,
          };
        });
      })
      .catch((er) => toast.error(er))
      .finally(() => {
        setLoading(false);
        setLoadMore(false);
      });
  };

  const handleSortBy = (e) => {
    setProducts((st) => ({ ...st, products: [], page: 1 }));
    setSortByFilter(e.target.value);
  };

  const handleLoadMore = () => {
    setLoadMore(true);
    getProducts({
      page: products.page + 1,
      ...filteredQueryParams,
    });
  };

  // console.log('colors', colors);
  // console.log('isMounted', isMounted);

  return (
    <Page title='StyleMax | Products Listing'>
      <Container>
        <CustomTypo
          variant='h3'
          sx={{
            marginBottom: '2%',
            textTransform: 'uppercase',
            fontSize: '24px !important',
          }}
          fontFamily='KoHo'
        >
          <ProductListingTitle />
        </CustomTypo>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <FilterSideMenu prodLoading={loading} />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Paper
              sx={{
                padding: '20px 10px',
                borderBottom: (theme) => `1px solid ${theme.custom.lightBack}`,
                marginBottom: '2%',
                boxShadow: 'none',
              }}
            >
              <Box
                display='flex'
                gap={1}
                justifyContent='space-between'
                sx={{
                  flexDirection: { xs: 'column-reverse', sm: 'row' },
                }}
              >
                <Box
                  display='flex'
                  gap={2}
                  flexWrap='wrap'
                  sx={{
                    justifyContent: { xs: 'center', sm: 'start' },
                  }}
                >
                  <BrandFilter brands={brands} />
                  <ColorFilter colors={colors} />
                  <StyleFilter
                    style={[
                      { label: 'Formal', value: 'Formal' },
                      { label: 'Casual', value: 'Casual' },
                      { label: 'Cultural', value: 'Cultural' },
                    ]}
                  />
                  <ShippingFilter />
                  <ConditionFilter conditions={condition} />
                  <PriceFilter />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: { xs: 'center', sm: 'end' },
                    height: 'fit-content',
                  }}
                >
                  <InputLabel sx={{ color: '#000', paddingRight: '10px' }}>
                    Sort By:
                  </InputLabel>
                  <Select
                    IconComponent={ExpandMoreIcon}
                    name='sortBy'
                    onChange={handleSortBy}
                    value={sortByFilter}
                    size='small'
                  >
                    <MenuItem value='price_desc'>Price: High to Low</MenuItem>
                    <MenuItem value='price_asc'>Price: Low to High</MenuItem>
                    <MenuItem value='date_asc'>Date: Oldest to Newest</MenuItem>
                    <MenuItem value='date_desc'>
                      Date: Newest to Oldest
                    </MenuItem>
                  </Select>
                </Box>
              </Box>
            </Paper>
            <RemoveFilter brands={brands} />
            {loading ? (
              <ProductList>
                {Array(6)
                  .fill()
                  .map((_, idx) => (
                    <ProductCardSkel key={idx * 2} />
                  ))}
              </ProductList>
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    fontSize={'16px'}
                    fontWeight={400}
                    marginLeft='2%'
                    marginBottom='3%'
                  >
                    {products.products?.length} Items
                  </Typography>
                </Grid>
                <ProductList>
                  {products.products?.map((product, index) => (
                    <Box key={`${product.label}-${index}`}>
                      <ProductCard
                        product={product}
                        prodImage={`${API_URL}${product.pictures[0]}`}
                      />
                    </Box>
                  ))}
                </ProductList>
                <Grid item xs={12} marginY={'4%'}>
                  <Typography fontSize={'24px'} fontWeight={400} align='center'>
                    {products.products.length} of {products.total} items are
                    shown
                  </Typography>
                </Grid>
                <Grid item xs={12} align='center' marginY={'1.5%'}>
                  <Button
                    disabled={
                      products.products.length === products.total || loadMore
                    }
                    onClick={handleLoadMore}
                    variant='contained'
                    sx={{
                      color: '#000',
                      bgcolor: '#D9D9D9',
                      paddingX: '4%',
                      fontSize: '20px',
                      textTransform: 'none',
                      fontWeight: 700,
                      '&:hover': { bgcolor: '#D9D9D9' },
                      minWidth: '156px',
                    }}
                  >
                    {loadMore ? <CircularProgress size={32} /> : 'Load More'}
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default ProductListing;
