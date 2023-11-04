import { Box } from '@mui/material';
import React from 'react';
import Container from '../components/common/Container';
import CustomTypo from '../components/common/CustomTypo';
import InlineLink from '../components/common/Link';
import Page from '../components/common/Page';

const PrivacyPolicy = () => {
  return (
    <Page title='StyleMax | Privacy Policy'>
      <Container>
        <CustomTypo fontFamily='KoHo' variant='h3' sx={{ textAlign: 'center' }}>
          Privacy Policy
        </CustomTypo>

        <Box mt={3} maxWidth='800px' marginInline='auto'>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            We value your privacy and want to ensure that your personal
            information is protected. This privacy policy explains how we
            collect, use, and protect your personal information when you use our
            website.
          </CustomTypo>

          <CustomTypo fontFamily='KoHo' variant='h6'>
            Information We Collect
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            When you make a purchase on our website, we collect personal
            information such as your name, email address, phone number, and
            shipping address. We also collect payment information such as your
            credit card number and billing address.
            <br />
            <br />
            When you visit our website, we collect non-personal information such
            as your IP address, browser type, and operating system. We use this
            information to analyze website traffic and improve our website.
          </CustomTypo>

          <CustomTypo fontFamily='KoHo' variant='h6'>
            How We Use Your Information
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            We use your personal information to process your orders and provide
            you with customer support. We may also use your information to send
            you promotional emails and newsletters.
            <br />
            <br />
            We do not sell or share your personal information with third-party
            companies for marketing purposes.
          </CustomTypo>

          <CustomTypo fontFamily='KoHo' variant='h6'>
            Security of Your Information
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            We take the security of your personal information seriously and use
            industry-standard encryption and security protocols to protect your
            information.
            <br />
            <br />
            We do not store your payment information on our website. All payment
            information is processed securely through our payment processor.
          </CustomTypo>

          <CustomTypo fontFamily='KoHo' variant='h6'>
            Cookies
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            We use cookies to improve your website experience and track website
            usage. Cookies are small files that are stored on your device when
            you visit our website. You can disable cookies in your browser
            settings, but this may affect your website experience.
          </CustomTypo>

          <CustomTypo fontFamily='KoHo' variant='h6'>
            Third-Party Websites
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            Our website may contain links to third-party websites. We are not
            responsible for the privacy practices or content of these websites.
          </CustomTypo>

          <CustomTypo fontFamily='KoHo' variant='h6'>
            Children's Privacy
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            Our website is not intended for use by children under the age of 13.
            We do not knowingly collect personal information from children under
            the age of 13.
          </CustomTypo>

          <CustomTypo fontFamily='KoHo' variant='h6'>
            Changes to Our Privacy Policy
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            We reserve the right to update our privacy policy at any time. We
            will notify you of any changes by posting the updated privacy policy
            on our website.
          </CustomTypo>

          <CustomTypo fontFamily='KoHo' variant='h6'>
            Contact Us
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            If you have any questions or concerns about our privacy policy,
            please contact us at{' '}
            <InlineLink to='/'>privacy@stylemax.com</InlineLink>
          </CustomTypo>
        </Box>
      </Container>
    </Page>
  );
};

export default PrivacyPolicy;
