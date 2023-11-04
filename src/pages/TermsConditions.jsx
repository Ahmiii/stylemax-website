import { Box } from '@mui/material';
import React from 'react';
import Container from '../components/common/Container';
import CustomTypo from '../components/common/CustomTypo';
import InlineLink from '../components/common/Link';
import Page from '../components/common/Page';

const TermsConditions = () => {
  return (
    <Page title='StyleMax | Terms & Conditions'>
      <Container>
        <CustomTypo fontFamily='KoHo' variant='h3' sx={{ textAlign: 'center' }}>
          Terms & Conditions
        </CustomTypo>

        <Box mt={3} maxWidth='800px' marginInline='auto'>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            Please read these terms and conditions carefully before using our
            website. By using our website, you agree to be bound by these terms
            and conditions.
          </CustomTypo>

          <CustomTypo fontFamily='KoHo' variant='h6'>
            Intellectual Property
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            All content on our website, including but not limited to text,
            graphics, logos, images, and software, is the property of our
            company or our licensors and is protected by United States and
            international copyright laws.
            <br />
            <br />
            You may not copy, distribute, reproduce, or transmit any content
            from our website without our prior written consent.
          </CustomTypo>

          <CustomTypo fontFamily='KoHo' variant='h6'>
            Use of Website
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            You may use our website for personal, non-commercial purposes only.
            You may not use our website for any illegal or unauthorized purpose,
            including but not limited to spamming, hacking, or distributing
            malware.
            <br />
            <br />
            You may not use our website to harass, defame, or harm others, or to
            violate their privacy rights.
            <br />
            <br />
            We reserve the right to terminate your access to our website at any
            time for any reason.
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='h6'>
            Product Descriptions
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            We make every effort to ensure that our product descriptions are
            accurate and complete. However, we do not warrant that our product
            descriptions are error-free, complete, or current.
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='h6'>
            Pricing and Availability
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            All prices listed on our website are subject to change without
            notice. We reserve the right to modify or discontinue any product at
            any time without notice.
            <br />
            <br />
            We make every effort to ensure that our products are available for
            purchase on our website. However, we do not guarantee that all
            products will be in stock or available for purchase at all times.
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='h6'>
            Limitation of Liability
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            In no event shall our company be liable for any direct, indirect,
            incidental, special, or consequential damages arising out of or in
            connection with your use of our website or the products purchased
            through our website.
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='h6'>
            Indemnification
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            You agree to indemnify and hold our company and its affiliates,
            officers, directors, agents, and employees harmless from any claim
            or demand, including reasonable attorneys' fees, made by any third
            party due to or arising out of your use of our website or your
            violation of these terms and conditions.
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='h6'>
            Governing Law
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            These terms and conditions shall be governed by and construed in
            accordance with the laws of the United States of America and the
            state of [insert state]. Any disputes arising under these terms and
            conditions shall be resolved exclusively by the state and federal
            courts located in [insert county].
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='h6'>
            Changes to Terms and Conditions
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            We reserve the right to update these terms and conditions at any
            time without notice. You are responsible for reviewing these terms
            and conditions periodically for changes. Your continued use of our
            website constitutes your agreement to these terms and conditions as
            updated.
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='h6'>
            Contact Us
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='body1' sx={{ mb: 3 }}>
            If you have any questions or concerns about our terms and
            conditions, please contact us at{' '}
            <InlineLink to='/'>info@stylemax.com</InlineLink>
          </CustomTypo>
        </Box>
      </Container>
    </Page>
  );
};

export default TermsConditions;
