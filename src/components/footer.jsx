import { Typography, Box, Link as MuiLink, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import { ReactComponent as Logo } from '../assets/StylMaxLogoWhite.svg';
import { Link } from 'react-router-dom';
import Container from './common/Container';

const MyLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  gap: 5,
  alignItems: 'center',
  textDecoration: 'none',
  height: '100%',
  color: 'white',
  width: 'fit-content',
}));

const FooterLink = styled(Link)(({ theme }) => ({
  alignItems: 'center',
  textDecoration: 'none',
  color: 'white',
  marginRight: '3px',
}));

function Footer() {
  return (
    <Grid container component='footer'>
      <Box width='100%' sx={{ background: (theme) => theme.custom.olive }}>
        <Grid
          container
          sx={{
            p: 3,
            display: 'flex',
            background: (theme) => theme.custom.olive,
            alignItems: 'center',
            textAlign: { xs: 'center', sm: 'unset' },
            maxWidth: '1440px',
            mx: 'auto',
          }}
        >
          <Grid item xs={12} sm={12} md={6}>
            <Typography
              variant='h4'
              sx={{
                WebkitTextStroke: '1px black',
                WebkitTextFillColor: 'white',
                fontFamily: 'Arial',
                textAlign: { xs: 'center', md: 'unset' },
              }}
            >
              Follow Us Socially
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} sx={{ mt: { sm: 2, md: 0 } }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                justifyContent: { xs: 'center', md: 'unset' },
              }}
            >
              <MyLink to='/registeration'>
                <Facebook />
                <Typography
                  variant='h6'
                  sx={{
                    textAlign: {
                      WebkitTextStroke: '1px black',
                      fontFamily: 'Arial',
                      WebkitTextFillColor: 'white',
                    },
                  }}
                >
                  Facebook
                </Typography>
              </MyLink>

              <MyLink to='/registeration'>
                <Instagram />
                <Typography
                  //   variant="h4"
                  sx={{
                    textAlign: {
                      fontWeight: 700,
                      fontSize: '20px',
                      fontFamily: 'Arial',
                      WebkitTextStroke: '1px black',
                      WebkitTextFillColor: 'white',
                    },
                  }}
                >
                  Instagram
                </Typography>
              </MyLink>

              <MyLink to='/registeration'>
                <Twitter />
                <Typography
                  //   variant="h4"
                  sx={{
                    textAlign: {
                      fontWeight: 700,
                      fontSize: '20px',
                      fontFamily: 'Arial',
                      WebkitTextStroke: '1px black',
                      WebkitTextFillColor: 'white',
                    },
                  }}
                >
                  Twitter
                </Typography>
              </MyLink>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        width='100%'
        sx={{ background: (theme) => theme.palette.secondary.main }}
      >
        <Grid
          container
          sx={{
            px: 2,
            display: 'flex',
            background: (theme) => theme.palette.secondary.main,
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '1440px',
            mx: 'auto',
          }}
        >
          <Grid item xs={12} align='center' sx={{ py: '50px' }}>
            <Link to='/'>
              <Logo />
            </Link>
          </Grid>

          <Grid
            sx={{
              color: '#fff',
              fontWeight: 700,
              fontSize: '20px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginBottom: '40px',
            }}
          >
            <FooterLink to='/'>HOME</FooterLink>
            <Typography component='span' sx={{ mx: 2 }}>
              |
            </Typography>
            <FooterLink to='/registeration'>ABOUT US</FooterLink>
            <Typography component='span' sx={{ mx: 2 }}>
              |
            </Typography>
            <FooterLink
              to='/registeration'
              // to={{
              //   pathname: '/products',
              //   search: '?category=brand',
              // }}
            >
              SHOP BY BRAND
            </FooterLink>
            <Typography component='span' sx={{ mx: 2 }}>
              |
            </Typography>
            <FooterLink
              to='/registeration'
              // to={{
              //   pathname: '/intermediary',
              //   search: '?category=men',
              // }}
            >
              MEN
            </FooterLink>
            <Typography component='span' sx={{ mx: 2 }}>
              |
            </Typography>
            <FooterLink
              to='/registeration'
              // to={{
              //   pathname: '/intermediary',
              //   search: '?category=women',
              // }}
            >
              WOMEN
            </FooterLink>
            <Typography component='span' sx={{ mx: 2 }}>
              |
            </Typography>
            <FooterLink to='/registeration'>CONTACT US</FooterLink>
            <Typography component='span' sx={{ mx: 2 }}>
              |
            </Typography>
            <FooterLink to='/registeration'>SELL WITH US</FooterLink>
          </Grid>

          <Grid
            sx={{
              color: '#fff',
              fontWeight: 400,
              fontSize: '16px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginY: '20px',
            }}
          >
            <FooterLink to='/registeration'>Shipping and Delivery</FooterLink>
            <Typography component='span' sx={{ mx: 2 }}>
              |
            </Typography>
            <FooterLink to='/registeration'>Return Policy</FooterLink>
            <Typography component='span' sx={{ mx: 2 }}>
              |
            </Typography>
            <FooterLink to='/registeration'>Privacy Policy</FooterLink>
            <Typography component='span' sx={{ mx: 2 }}>
              |
            </Typography>
            <FooterLink to='/registeration'>Terms and Conditions</FooterLink>
            <Typography component='span' sx={{ mx: 2 }}>
              |
            </Typography>
            <FooterLink to='/registeration'>Guide to StyleMax</FooterLink>
          </Grid>
        </Grid>
      </Box>
    </Grid>
    // </Box>
  );
}

export default Footer;
