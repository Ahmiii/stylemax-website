import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import Page from '../components/common/Page';
import ProductImageGrid from '../components/singleproductView/ProductImageGrid';

import ProductInfo from '../components/singleproductView/ProductInfo';
import OtherProduct from '../components/singleproductView/otherProduct';
import Return_policy from '../components/singleproductView/return_policy';
import Container from '../components/common/Container';
import ContentLoader from '../components/loader/ContentLoader';
import axios from 'axios';
import API_URL from '../config';
import { toast } from 'react-toastify';
import { getSingleProduct } from '../api/orders';

const ProductDetails = () => {
  const [product, setProduct] = useState({
    loading: true,
    product: null,
  });

  const [colors, setColors] = useState([]);
  const [styles, setStyles] = useState([]);
  const [size, setSize] = useState([]);

  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (id) getProduct(id);
  }, [id]);

  const getProduct = async (id) => {
    getSingleProduct(id)
      .then((response) => {
        setColors(response?.data?.colours ?? []);
        setSize(response?.data?.sizes ?? []);
        setStyles(response?.data?.styles ?? []);
        setProduct((st) => ({ ...st, product: response.data }));
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setProduct((st) => ({ ...st, loading: false }));
      });
  };

  if (product.loading) return <ContentLoader />;

  return (
    <Page title='StyleMax | Product Overview'>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={8}>
            <ProductImageGrid
              images={product.product.pictures}
              prodId={id}
              likeCommentsShares={{
                likes: product.product.likes,
                comments: product.product.comments,
                shares: product.product.share_count,
              }}
              isLiked={product.product.liked}
              getProduct={getProduct}
            />
            <Box my={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <OtherProduct
                subCatId={product?.product?.sub_category?.id}
                subCatlabel={product?.product?.sub_category?.label}
                colors={colors}
                size={size}
                styles={styles}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Box
              display='flex'
              flexDirection='column'
              gap={2}
              justifyContent='space-between'
            >
              <ProductInfo product={product.product} />
              <Return_policy />
              <Box my={6} sx={{ display: { xs: 'block', md: 'none' } }}>
                <OtherProduct
                  subCatId={product?.product?.sub_category?.id}
                  subCatlabel={product?.product?.sub_category?.label}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default ProductDetails;
