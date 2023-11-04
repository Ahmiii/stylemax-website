import { Box, styled } from '@mui/material';
import React from 'react';
import Container from '../components/common/Container';
import CustomTypo from '../components/common/CustomTypo';
import InlineLink from '../components/common/Link';
import Page from '../components/common/Page';

const AboutUs = () => {
  return (
    <Page title='StyleMax | About Us'>
      <Container>
        <CustomTypo fontFamily='KoHo' variant='h3' sx={{ textAlign: 'center' }}>
          About Us
        </CustomTypo>

        <Box mt={1} maxWidth='800px' marginInline='auto'>
          <CustomTypo
            fontFamily='KoHo'
            variant='h5'
            sx={{ mb: 3, textAlign: 'center' }}
          >
            StyleMax is your Circular Fashion Marketplace
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 1 }}>
            StyleMax is new and growing circular fashion marketplace where you
            can discover items that will breathe again in your closet. Our
            mission is to extend the life cycle of goods and create a more
            affordable and sustainable future for fashion and help to solve the
            fashion waste crisis.
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            Our objective is to connect the people across Canada and inspire
            them to shop and sell their items. We all have things that we don’t
            use. But these important items still have value. Our platform is the
            right place for you with all the required tools and features to sell
            and buy items.
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='h6' sx={{ mb: 0.5 }}>
            Vision Statement:
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            "At StyleMax, we envision a world where fashion is accessible,
            eco-friendly, and responsible, empowering people to express their
            individuality while contributing to a sustainable future".
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='h6' sx={{ mb: 0.5 }}>
            Mission Statement:
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            StyleMax is committed to revolutionizing the way Canadians shop for
            Fashion by offering a wide selection of high-quality, gently-used
            items through our online thrift store.
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 0.5 }}>
            Our mission is to:
          </CustomTypo>
          <UlExt>
            <li>
              <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 0.5 }}>
                Promote sustainable fashion choices by providing affordable,
                stylish, and environmentally conscious options that reduce waste
                and extend the life cycle of Personal use Products.
              </CustomTypo>
            </li>
            <li>
              <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 0.5 }}>
                Empower our customers to embrace their unique style and make a
                positive impact on the environment by choosing to shop at a
                sustainable, socially responsible online store.
              </CustomTypo>
            </li>
            <li>
              <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 0.5 }}>
                Foster a strong and inclusive community of eco-conscious fashion
                enthusiasts who support and advocate for sustainable practices
                in the industry.
              </CustomTypo>
            </li>
            <li>
              <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 0.5 }}>
                Collaborate with local charities and organizations to give back
                to our communities and create meaningful opportunities for those
                in need.
              </CustomTypo>
            </li>
            <li>
              <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 0.5 }}>
                Partner with Local Retailers to allowing them to be part of the
                Circular Economy and save their carbon tax.
              </CustomTypo>
            </li>
            <li>
              <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 0.5 }}>
                Continuously strive for innovation and improvement in our
                operations, customer experience, and product offerings, ensuring
                our commitment to sustainability remains at the core of
                everything we do.
              </CustomTypo>
            </li>
          </UlExt>
        </Box>
      </Container>
    </Page>
  );
};

const UlExt = styled('ul')(() => ({
  marginLeft: '1.20rem',
  marginTop: '1.5rem',
  '& > li > p': {
    marginBottom: 18,
    marginLeft: 15,
  },
}));

export default AboutUs;
