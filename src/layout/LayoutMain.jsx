import React, { useEffect } from 'react';
import Header from '../components/header';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/footer';
import { Box, Container, Grid } from '@mui/material';
import ScrollToTop from '../components/common/ScrollToTop';
import BreadCrumbsExt from '../components/BreadCrumbs';

const LayoutMain = () => {
  const location = useLocation();
  useEffect(() => {
    document.getElementById('root').scroll({
      top: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);

  return (
    <React.Fragment>
      <Header />
      <Box flex={1} my={6}>
        <div className='MuiBox-root css-10k5s85'>
          <BreadCrumbsExt />
        </div>
        <Outlet />
      </Box>
      <ScrollToTop />
      <Footer />
    </React.Fragment>
  );
};

export default LayoutMain;
