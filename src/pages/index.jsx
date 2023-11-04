import React, { useEffect } from 'react';
import { Grid, Typography, Button, useTheme, Box } from '@mui/material';
import Page from '../components/common/Page';
import { styled } from '@mui/material/styles';
import HomeImage_1 from '../assets/images/HomePage-1.png';
import howToSell from '../assets/images/howToSell.png';
import whyCard1 from '../assets/images/whyCard1.png';
import whyCard2 from '../assets/images/whyCard2.png';
import whyCard3 from '../assets/images/whyCard3.png';
import discountCard1 from '../assets/images/discountCard1.png';
import discountCard2 from '../assets/images/discountCard2.png';
import discountCard3 from '../assets/images/discountCard3.png';
import discountCard4 from '../assets/images/discountCard4.png';
import giftCard1 from '../assets/images/giftCard1.png';
import giftCard2 from '../assets/images/giftCard2.png';
import WhyCard from '../components/cards/WhyCard';
import CategoryCard from '../components/cards/CategoryCard';
import { useNavigate } from 'react-router-dom';

import RedButton from '../components/common/Button';
import CustomTypo from '../components/common/CustomTypo';
import { getBrands } from '../api/brands';
import { remoteUrl } from '../api';
import { getCategories } from '../api/categories';

const WinterButton = styled(Button)(() => ({
  backgroundColor: '#FCFCFC',
  color: '#DF1B0F',
  borderRadius: '8px',
  fontSize: '22px',
  fontWeight: '700',
  minWidth: '250px',
  '&:hover': {
    backgroundColor: '#FCFCFC',
  },
}));

const HomePage = () => {
  const whyCardsContent = [
    {
      title: 'Sell Easily',
      description:
        'What`ever you style, you will find a buyer looking for items like your in our ever-growing community.',
      imgUrl: whyCard1,
    },
    {
      title: 'Make money',
      description: 'Sell your clothes. Make money to buy new-to-you ones',
      imgUrl: whyCard2,
    },
    {
      title: 'Make an impact',
      description:
        'By selling on StyleMax you are keeping items in the circular economy and helping reduce fashion waste.',
      imgUrl: whyCard3,
    },
  ];

  const discountCards = [
    {
      title: 'BAGS',
      imgUrl: discountCard1,
      subcategory: 'bags',
    },
    {
      title: 'DRESSES',
      imgUrl: discountCard2,
      subcategory: 'dresses',
    },
    {
      title: 'JEWELRY',
      imgUrl: discountCard3,
      subcategory: 'jewelry',
    },
    {
      title: 'LAST CHANCE',
      title2: '70% to 80%',
      imgUrl: discountCard4,
      category: 'sale',
    },
  ];
  const giftCards = [
    {
      title: 'FOR HER',
      imgUrl: giftCard1,
      category: 'women',
      url: '/intermediary?category=women',
    },
    {
      title: 'FOR HIM',
      imgUrl: giftCard2,
      category: 'men',
      url: '/intermediary?category=men',
    },
  ];

  const [brands, setBrands] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    getBrands().then((res) => {
      const fetchedBrands = res?.data?.filter((r) => r.logo)?.slice(0, 6) ?? [];
      setBrands(fetchedBrands);
    });
  }, []);

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res.data);
    });
  }, []);

  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Page title='StyleMax | Ecommerce Marketplace'>
      <Box
        maxWidth='1400px'
        mx='auto'
        display='flex'
        flexDirection='column'
        gap={3}
        justifyContent='center'
        alignItems='center'
      >
        <Grid container>
          <Grid item xs={12} sm={5} md={4}>
            <Box
              display='flex'
              flexDirection='column'
              gap={3}
              justifyContent='center'
              px={3}
              height='100%'
              sx={{
                [theme.breakpoints.down('sm')]: {
                  alignItems: 'center',
                  textAlign: 'center',
                },
              }}
            >
              <Typography variant='h2'>
                BUY. SELL.
                <br />
                DO IT ALL OVER.
              </Typography>
              <Typography variant='body1'>
                Welcome to the community-powered thrift shopping marketplace
              </Typography>
              <Button
                variant='contained'
                color='primary'
                size='large'
                onClick={() => {
                  navigate('/registeration');
                  // navigate('/intermediary?category=women');
                  // navigate(0);
                }}
                sx={{ height: '60px', width: '100%', maxWidth: '270px' }}
              >
                Shop Now
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={7} md={8}>
            <Box
              width='100%'
              height='100%'
              sx={{
                '& img': {
                  objectFit: 'cover',
                  objectPosition: 'center',
                  maxHeight: '500px',
                  [theme.breakpoints.down('sm')]: {
                    mt: 2,
                  },
                },
              }}
            >
              <img
                src={HomeImage_1}
                alt='Home Page 1'
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '10px',
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Typography
              variant='h3'
              gutterBottom
              sx={{
                textTransform: 'uppercase',
                pl: 3,
                textAlign: { xs: 'center', sm: 'unset' },
              }}
            >
              Why stylemax?
            </Typography>
          </Grid>
          <Box
            display='flex'
            justifyContent='center'
            flexWrap='wrap'
            alignItems='center'
            width='100%'
            gap={2}
          >
            {whyCardsContent.map((card) => (
              <WhyCard
                key={card.title}
                title={card.title}
                description={card.description}
                imgUrl={card.imgUrl}
              />
            ))}
          </Box>
        </Grid>
        <Box
          width='100%'
          height='fit-content'
          display='flex'
          alignItems='center'
          minHeight='600px'
          py='6rem'
          sx={{
            bgcolor: (theme) => theme.custom.red.main,
            textAlign: 'center',
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <CustomTypo
                variant='h1'
                fontFamily='KoHo'
                sx={{
                  fontSize: '6rem !important',
                  fontWeight: 500,
                  // paddingTop: '8%',
                  color: '#fff',
                }}
              >
                WINTER
              </CustomTypo>
            </Grid>
            <Grid item xs={12}>
              <CustomTypo
                variant='h1'
                fontFamily='K2D'
                sx={{
                  fontSize: '7rem !important',
                  fontWeight: 500,
                  paddingBottom: '4%',
                  color: '#fff',
                  textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  WebkitTextStroke: '1px black',
                  WebkitTextFillColor: 'white',
                }}
              >
                SALE
              </CustomTypo>
            </Grid>
            <Grid item xs={12}>
              <Box
                width='100%'
                display='flex'
                columnGap='8rem'
                rowGap='1rem'
                flexWrap='wrap'
                justifyContent='center'
              >
                <WinterButton
                  variant='contained'
                  sx={{ color: '#DF1B0F', bgcolor: '#fff' }}
                  onClick={() => {
                    navigate('/registeration');
                    // navigate('/intermediary?category=women');
                    // navigate(0);
                  }}
                >
                  WOMEN'S SALE
                </WinterButton>
                <WinterButton
                  variant='contained'
                  sx={{ color: '#DF1B0F', bgcolor: '#fff' }}
                  onClick={() => {
                    navigate('/registeration');
                    // navigate('/intermediary?category=men');
                    // navigate(0);
                  }}
                >
                  MEN'S SALE
                </WinterButton>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant='h5'
              sx={{
                px: 3,
                pb: 1.5,

                [theme.breakpoints.down('sm')]: {
                  alignItems: 'center',
                  textAlign: 'center',
                },
              }}
            >
              SHOP BY CATEGORY
            </Typography>
          </Grid>
          {categories.slice(0, 4).map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <CategoryCard
                title={card.label}
                imgUrl={`${remoteUrl}${card.picture}`}
                category={card.category}
                subcategory={card.subcategory}
                handleClick={
                  () => navigate('/registeration')
                  // navigate(`intermediary?category=${card.label}`)
                }
              />
            </Grid>
          ))}
          <Grid
            item
            xs={12}
            sx={{
              mt: 2,
              display: 'flex',
              gap: '2%',
              alignItems: 'center',
              justifyContent: 'flex-end',
              pr: 3,
              [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
                justifyContent: 'unset',
                px: 3,
                gap: 1,
              },
            }}
          >
            <Typography variant='subtitle1'>
              Looking for more great deals ...
            </Typography>

            <RedButton
              label='Discover All'
              size='large'
              onClick={() => navigate('/registeration')}
              // onClick={() => navigate('/products')}
            />
          </Grid>
        </Grid>
        <Grid container sx={{ px: 3, mt: '1%' }}>
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',

              [theme.breakpoints.down('sm')]: {
                alignItems: 'center',
                textAlign: 'center',
              },
            }}
          >
            <Typography variant='h2'>TOP BRANDS</Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: '24px',
              }}
            >
              Discover all brands in our online store.
            </Typography>
            <Button
              variant='contained'
              color='primary'
              size='large'
              sx={{
                width: '200px',
                marginTop: '8%',
              }}
              onClick={() => navigate('/registeration')}
              // onClick={() => navigate('/products')}
            >
              Discover All
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={8}
            sx={{
              pl: 2,
              [theme.breakpoints.down('sm')]: {
                mt: 4,
              },
            }}
          >
            <Grid container spacing={3}>
              {brands.map((brand, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box
                    sx={{
                      backgroundColor: '#D9D9D9',
                      height: '100%',
                      p: 2,
                      maxWidth: '300px',
                      mx: 'auto',
                    }}
                    onClick={() => {
                      navigate('/registeration');
                      // navigate(`/products?brand=${brand.label}`);
                    }}
                  >
                    <img
                      src={`${remoteUrl}${brand.logo}`}
                      alt=''
                      width='100%'
                      height='100%'
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
            {/* <Box
              display='flex'
              flexWrap='wrap'
              alignItems='center'
              justifyContent='end'
              gap={2}
              marginLeft='auto'
              sx={{
                [theme.breakpoints.down('sm')]: {
                  justifyContent: 'center',
                },
              }}
            >
              {brands.map((brand, index) => (
                <Box
                  key={index}
                  sx={{
                    backgroundColor: '#D9D9D9',
                    textAlign: 'center',
                    height: '100%',
                    display: 'inline-block',
                    p: 2,
                    '& img': {
                      objectFit: 'contain',
                    },
                  }}
                >
                  <img src={brand} alt='' />
                </Box>
              ))}
            </Box> */}
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant='h5'
              sx={{
                px: 3,
                pb: 1.5,
                [theme.breakpoints.down('sm')]: {
                  textAlign: 'center',
                },
              }}
            >
              UPTO 80% OFF
            </Typography>
          </Grid>
          {discountCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <CategoryCard
                title={card.title}
                imgUrl={card.imgUrl}
                title2={card.title2}
                subcategory={card.subcategory}
                category={card.category}
                handleClick={() => navigate('/registeration')}
                // handleClick={() => navigate(``)}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant='h5'
              sx={{
                px: 3,
                pb: 1.5,
                textTransform: 'uppercase',
                [theme.breakpoints.down('sm')]: {
                  textAlign: 'center',
                },
              }}
            >
              looking for gifts for her or him...
            </Typography>
          </Grid>
          {giftCards.map((card, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <CategoryCard
                title={card.title}
                imgUrl={card.imgUrl}
                height={846}
                category={card.category}
                handleClick={() => navigate('/registeration')}
                // handleClick={() => navigate(card.url)}
              />
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          sx={{
            px: 3,
            marginTop: '1%',
            [theme.breakpoints.up('sm')]: {
              pl: 3,
              pr: 0,
            },
          }}
        >
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 5,
              pr: 1,
              [theme.breakpoints.down('sm')]: {
                textAlign: 'center',
                alignItems: 'center',
              },
            }}
          >
            <Typography variant='h2'>HOW TO SELL?</Typography>
            <Typography variant='body1'>
              It’s easy to get started - just create an account to start
              selling. Take up to four photos. Describe what you’re selling.
              Decide your price. Get paid fast when your item sells.. Ship
              Repeat.
            </Typography>
            <Button
              variant='contained'
              size='large'
              sx={{ width: '200px' }}
              onClick={() => navigate('/registeration')}
              // onClick={() => navigate('/guidetostylemax')}
            >
              Discover More
            </Button>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box
              width='100%'
              height='100%'
              sx={{
                '& img': {
                  objectFit: 'cover',
                  objectPosition: 'center',
                  [theme.breakpoints.down('sm')]: {
                    mt: 2,
                  },
                },
              }}
            >
              <img
                src={howToSell}
                alt='Home Page 1'
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '10px',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
};

export default HomePage;
