import { Box } from '@mui/material';
import React from 'react';
import Container from '../components/common/Container';
import CustomTypo from '../components/common/CustomTypo';
import Page from '../components/common/Page';

const ShippingDelivery = () => {
  return (
    <Page title='StyleMax | Shipping Delivery'>
      <Container>
        <CustomTypo fontFamily='KoHo' variant='h3' sx={{ textAlign: 'center' }}>
          Shipping & Delivery
        </CustomTypo>

        <Box mt={3} maxWidth='800px' marginInline='auto'>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            Thank you for choosing to shop with us. We want to make sure that
            you receive your order as quickly as possible and in good condition.
            Please review our shipping and delivery policy before placing your
            order.
          </CustomTypo>

          <CustomTypo fontFamily='KoHo' variant='h6'>
            Shipping Methods and Fees
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            We offer standard and expedited shipping options for most orders.
            The shipping fees are based on the weight of your order and the
            shipping destination. The shipping cost and estimated delivery time
            will be displayed at checkout.
          </CustomTypo>

          <CustomTypo fontFamily='KoHo' variant='h6'>
            Delivery Times
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            We strive to ship all orders within 1-2 business days of receipt.
            Once your order has shipped, you will receive a shipping
            confirmation email with a tracking number. Please note that delivery
            times may vary depending on your location and shipping method.
          </CustomTypo>

          <CustomTypo fontFamily='KoHo' variant='h6'>
            International Shipping
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            We offer international shipping to most countries. Please note that
            additional customs fees and taxes may apply. We are not responsible
            for any customs fees or delays.
          </CustomTypo>

          <CustomTypo fontFamily='KoHo' variant='h6'>
            Delivery Issues
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            If you experience any issues with the delivery of your order, please
            contact our customer service team as soon as possible. We will work
            with you to resolve the issue and ensure that your order is
            delivered as soon as possible.
          </CustomTypo>

          <CustomTypo fontFamily='KoHo' variant='h6'>
            Lost or Damaged Packages
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            If your package is lost or damaged during shipping, please contact
            our customer service team as soon as possible. We will work with the
            shipping carrier to locate your package or initiate a replacement.
          </CustomTypo>

          <CustomTypo fontFamily='KoHo' variant='h6'>
            Delivery Address Changes
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            If you need to change the delivery address for your order, please
            contact our customer service team as soon as possible. We will make
            every effort to update the delivery address, but we cannot guarantee
            that the change will be made in time.
          </CustomTypo>

          <CustomTypo fontFamily='KoHo' variant='h6'>
            Delivery Refusals
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            If you refuse delivery of your order, please contact our customer
            service team as soon as possible. We will process your return once
            we receive the package.
            <br />
            <br />
            Please note that we are not responsible for any delays or delivery
            issues caused by the shipping carrier. We will make every effort to
            ensure that your order is delivered as quickly and efficiently as
            possible. If you have any questions or concerns about our shipping
            and delivery policy, please contact our customer service team.
          </CustomTypo>
        </Box>
      </Container>
    </Page>
  );
};

export default ShippingDelivery;
