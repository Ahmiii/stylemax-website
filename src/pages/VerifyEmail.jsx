import { Formik } from 'formik';
import * as Yup from 'yup';

import React, { useState } from 'react';
import Container from '../components/common/Container';
import Page from '../components/common/Page';
import Logo from '../components/Logo/Logo';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import {
  Button,
  FormHelperText,
  Grid,
  OutlinedInput,
  Stack,
  Box,
  CircularProgress,
} from '@mui/material';
import API_URL from '../config';
import InlineLink from '../components/common/Link';
import CustomTypo from '../components/common/CustomTypo';

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  return (
    <Page title='StyleMax | Email Verification'>
      <Container>
        <Box
          display='flex'
          flexDirection='column'
          gap={2}
          maxWidth='500px'
          mx='auto'
          my={3}
        >
          <Box mx='auto' width='250px' mb={5}>
            <Logo />
          </Box>
          <Formik
            initialValues={{
              email: '',
              submit: null,
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
            })}
            onSubmit={async (
              values,
              { setErrors, setStatus, setSubmitting, resetForm }
            ) => { 
              try {
                setLoading(true);
                const { data } = await axios.get(
                  `${API_URL}/verify/resend-verification-email/${values.email}`
                );
                resetForm();
                setLoading(false);
                toast.success(data.message);
                setStatus({ success: true });
                setSubmitting(false);
              } catch (err) {
                setLoading(false);
                toast.error(err.response.data);
                setStatus({ success: false });
                setErrors({ submit: err.response.data });
                setSubmitting(false);
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <CustomTypo
                        fontFamily='KoHo'
                        variant='subtitle1'
                        htmlFor='email-ForgotPassword'
                      >
                        Email Address
                      </CustomTypo>
                      <OutlinedInput
                        id='email-ForgotPassword'
                        type='email'
                        value={values.email}
                        name='email'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder='Enter email address'
                        fullWidth
                        error={Boolean(touched.email && errors.email)}
                      />
                      {touched.email && errors.email && (
                        <FormHelperText
                          error
                          id='standard-weight-helper-text-email-ForgotPassword'
                        >
                          {errors.email}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sx={{ mt: -1 }}>
                    <Stack
                      direction='row'
                      justifyContent='end'
                      alignItems='center'
                      spacing={2}
                    >
                      <InlineLink
                        variant='h6'
                        component={RouterLink}
                        to='/login'
                        color='text.primary'
                      >
                        Already have account?
                      </InlineLink>
                    </Stack>
                  </Grid>
                  {errors.submit && (
                    <Grid item xs={12}>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      fullWidth
                      size='large'
                      type='submit'
                      variant='contained'
                      color='primary'
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Box>
      </Container>
    </Page>
  );
};

export default VerifyEmail;
