import { Box } from '@mui/material';
import React from 'react';
import Container from '../components/common/Container';
import CustomTypo from '../components/common/CustomTypo';
import InlineLink from '../components/common/Link';
import Page from '../components/common/Page';

const HowItWorks = () => {
  return (
    <Page title='StyleMax | Privacy Policy'>
      <Container>
        <CustomTypo fontFamily='KoHo' variant='h3' sx={{ textAlign: 'center' }}>
          How It Works
        </CustomTypo>

        <Box mt={3} maxWidth='800px' marginInline='auto'>
          <CustomTypo fontFamily='KoHo' variant='h4' sx={{ mb: 1 }}>
            How to start on StyleMax! (for Sellers)
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            First time to StyleMax? No worries!
          </CustomTypo>

          <CustomTypo fontFamily='KoHo' variant='h6'>
            List it fast
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            Select the item in your closet that you love but don’t use it
            anymore. Snap few pics, add a short description and price it
            competitive.
          </CustomTypo>

          <CustomTypo fontFamily='KoHo' variant='h6'>
            Ship it soon
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            Once the item is sold, our pre-paid pre-addressed shipping label
            will make shipping easy for you. All you have to do is package up
            the item, adhere the label and drop at the nearest Canada Post.
          </CustomTypo>

          <CustomTypo fontFamily='KoHo' variant='h6'>
            Make Money
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            Once the order is confirmed, we will deposit your money directly
            into your account. You can withdraw anytime for free.
          </CustomTypo>

          <CustomTypo fontFamily='KoHo' variant='h6'>
            Our fee charges
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            StyleMax will not charge any fees on listing your items. Fees will
            be charged once item is sold from our platform. Any sale which is
            equal to or less than C$30, we will charge flat commission of C$2.
            For sale which is C$31 and above, we will charge 15% commission.
          </CustomTypo>

          <CustomTypo fontFamily='KoHo' variant='h4' sx={{ mb: 1 }}>
            How to start on StyleMax! (for Buyers)
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            Shopping on our site is easy and convenient. Follow these simple
            steps to place an order:
          </CustomTypo>

          <CustomTypo fontFamily='KoHo' variant='h6'>
            Step 1: Browse our products
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            Take a look at our selection of products and find the items you
            would like to purchase. You can use our search bar to find a
            specific item or browse by category.
          </CustomTypo>

          <CustomTypo fontFamily='KoHo' variant='h6'>
            Step 2: Add to cart
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            Once you have found the items you would like to purchase, simply
            click the "Add to Cart" button. You can continue shopping and add as
            many items as you like to your cart.
          </CustomTypo>

          <CustomTypo fontFamily='KoHo' variant='h6'>
            Step 3: Check out
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            When you're ready to complete your purchase, click the "Cart" button
            at the top of the page. Review your order and make sure everything
            is correct. If you have a discount code, you can enter it at this
            time.
          </CustomTypo>

          <CustomTypo fontFamily='KoHo' variant='h6'>
            Step 4: Enter your information
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            Next, you will need to enter your shipping and billing information.
            If you have an account with us, you can log in to speed up the
            process.
          </CustomTypo>

          <CustomTypo fontFamily='KoHo' variant='h6'>
            Step 5: Review and confirm your order
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            Before you submit your order, make sure everything is correct. You
            will be able to review your order one last time before confirming
            your purchase.
          </CustomTypo>

          <CustomTypo fontFamily='KoHo' variant='h6'>
            Step 6: Receive your order
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            Once your order is confirmed, we will begin processing it. You will
            receive a confirmation email with your order details and a tracking
            number. Your order will be shipped to you as soon as possible.
            <br />
            <br />
            Thank you for choosing our e-commerce site. We hope you enjoy your
            shopping experience!
          </CustomTypo>
        </Box>
      </Container>
    </Page>
  );
};

export default HowItWorks;
