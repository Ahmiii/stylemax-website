import {
  Box,
  Button,
  FormHelperText,
  Grid,
  OutlinedInput,
  CircularProgress,
  Stack,
} from '@mui/material';
import React, { useState } from 'react';
import Container from '../components/common/Container';
import CustomTypo from '../components/common/CustomTypo';
import InlineLink from '../components/common/Link';
import Page from '../components/common/Page';
import axios from 'axios';
import { toast } from 'react-toastify';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config';

const ContactUs = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <Page title='StyleMax | Contact Us'>
      <Box maxWidth='800px' mx='auto' width='100%'>
        <CustomTypo fontFamily='KoHo' variant='h2' sx={{ mb: 7 }}>
          Love to hear from you,
          <br />
          Get in touch 👋🏼
        </CustomTypo>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            contact: '',
            message: '',
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email('Must be a valid email')
              .max(255)
              .required('Specify your email'),
            firstName: Yup.string()
              .min(3)
              .max(120)
              .required('specify your first name'),
            lastName: Yup.string()
              .min(3)
              .max(120)
              .required('specify your last name'),
            contact: Yup.string().min(3),
            message: Yup.string()
              .min(3)
              .max(120)
              .required('write something to submit'),
          })}
          onSubmit={async (
            values,
            { resetForm, setErrors, setStatus, setSubmitting }
          ) => {
            setLoading(true);
            try {
              const { data } = await axios.post(
                `${API_URL}/contact-us/message`,
                {
                  first_name: values.firstName,
                  last_name: values.lastName,
                  email: values.email,
                  phone: values.contact.toString(),
                  message: values.message,
                }
              );
              setLoading(false);
              resetForm();
              toast.success('Message sent successfully');
            } catch (error) {
              setLoading(false);
              toast.error(error.message);
            }

            // navigate('/');
            // setSubmitting(false);
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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <CustomTypo
                      fontFamily='KoHo'
                      variant='subtitle1'
                      htmlFor='email-contactus'
                    >
                      First Name
                    </CustomTypo>
                    <OutlinedInput
                      id='firstName-contactus'
                      value={values.firstName}
                      name='firstName'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder='first name'
                      fullWidth
                      error={Boolean(touched.firstName && errors.firstName)}
                    />
                    {touched.firstName && errors.firstName && (
                      <FormHelperText
                        error
                        id='standard-weight-helper-text-firstName-contactus'
                      >
                        {errors.firstName}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <CustomTypo
                      fontFamily='KoHo'
                      variant='subtitle1'
                      htmlFor='lastName-contactus'
                    >
                      Last Name
                    </CustomTypo>
                    <OutlinedInput
                      id='lastName-contactus'
                      value={values.lastName}
                      name='lastName'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder='last name'
                      fullWidth
                      error={Boolean(touched.lastName && errors.lastName)}
                    />
                    {touched.lastName && errors.lastName && (
                      <FormHelperText
                        error
                        id='standard-weight-helper-text-lastName-contactus'
                      >
                        {errors.lastName}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <CustomTypo
                      fontFamily='KoHo'
                      variant='subtitle1'
                      htmlFor='email-contactus'
                    >
                      Email Address
                    </CustomTypo>
                    <OutlinedInput
                      id='email-contactus'
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
                        id='standard-weight-helper-text-email-contactus'
                      >
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <CustomTypo
                      fontFamily='KoHo'
                      variant='subtitle1'
                      htmlFor='contact-contactus'
                    >
                      Contact No
                    </CustomTypo>
                    <OutlinedInput
                      id='contact-contactus'
                      type='tel'
                      value={values.contact}
                      name='contact'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder='Enter contact address'
                      fullWidth
                      error={Boolean(touched.contact && errors.contact)}
                    />
                    {touched.contact && errors.contact && (
                      <FormHelperText
                        error
                        id='standard-weight-helper-text-contact-contactus'
                      >
                        {errors.contact}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <CustomTypo
                      fontFamily='KoHo'
                      variant='subtitle1'
                      htmlFor='message-contactus'
                    >
                      Message
                    </CustomTypo>
                    <OutlinedInput
                      id='message-contactus'
                      type='message'
                      value={values.message}
                      name='message'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder='Enter message address'
                      fullWidth
                      multiline
                      rows={7}
                      error={Boolean(touched.message && errors.message)}
                    />
                    {touched.message && errors.message && (
                      <FormHelperText
                        error
                        id='standard-weight-helper-text-message-contactus'
                      >
                        {errors.message}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
              </Grid>
              <Box mt={4} textAlign='right'>
                <Button
                  variant='contained'
                  size='large'
                  sx={{ width: '200px' }}
                  type='submit'
                >
                  {loading ? (
                    <CircularProgress sx={{ color: 'inherit' }} size={25} />
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Page>
  );
};

export default ContactUs;
