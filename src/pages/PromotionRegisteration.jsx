import { Formik } from 'formik';
import * as Yup from 'yup';

import React, { useEffect, useState } from 'react';
import Container from '../components/common/Container';
import Page from '../components/common/Page';
import Logo from '../components/Logo/Logo';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Button,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Box,
  CircularProgress,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CustomTypo from '../components/common/CustomTypo';
import { signup } from '../store/slices/auth/extraReducers';
import bgImg from '../assets/backgroundImage.jpg';
import Header from '../components/header';
import ScrollToTop from '../components/common/ScrollToTop';
import Footer from '../components/footer';
import Registeration from '../dialogs/RegResponse';

const PromoRegisteration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((st) => st.auth);
  const [showDialog, setShowDialog] = useState(false);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (user) navigate('/');
  }, []);

  const location = useLocation();
  useEffect(() => {
    document.getElementById('root').scroll({
      top: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);

  const [showPassword, setShowPassword] = React.useState({
    password: false,
    passwordConfirm: false,
  });
  const [loading, setLoading] = React.useState(false);
  const handleClickShowPassword = (e) => {
    const { fieldname } = e.currentTarget.dataset;

    setShowPassword((st) => ({
      ...st,
      [fieldname]: !st[fieldname],
    }));
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Box position='relative'>
        <Box
          sx={{
            backgroundImage: `url(${bgImg})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top center',
            marginBlock: '0 !important',
            opacity: 0.1,
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }}
        />
        <Header />
        <Box flex={1} my={10}>
          <Page title='StyleMax | Register'>
            <Container>
              <Box mx='auto' width='300px' mb={7} mt={4}>
                <Logo />
              </Box>
              <Box
                mb={10}
                display='flex'
                gap={3}
                flexDirection='column'
                alignItems='center'
                sx={{ textAlign: 'center' }}
              >
                <CustomTypo fontFamily='KoHo' variant='h6'>
                  Wait, is there such a thing as an online thrift store?
                </CustomTypo>
                <CustomTypo
                  fontFamily='KoHo'
                  variant='h3'
                  sx={{
                    color: (theme) => theme.palette.success.dark,
                  }}
                >
                  STAY TUNED, StyleMax.ca IS COMING...
                </CustomTypo>
              </Box>
              <Box
                mb={5}
                display='flex'
                alignItems='center'
                justifyContent='center'
                flexWrap='wrap'
                gap={1}
                sx={{ textAlign: 'center' }}
              >
                <CustomTypo fontFamily='KoHo' variant='h3' color='error'>
                  REGISTER NOW
                </CustomTypo>
                <CustomTypo fontFamily='KoHo' variant='h3'>
                  TO GET the Store Opening discounted coupon.
                </CustomTypo>
              </Box>
              <Box
                display='flex'
                flexDirection='column'
                gap={2}
                maxWidth='500px'
                mx='auto'
                my={3}
              >
                <Formik
                  initialValues={{
                    email: '',
                    firstName: '',
                    lastName: '',
                    password: '',
                    passwordConfirm: '',
                    submit: null,
                  }}
                  validationSchema={Yup.object().shape({
                    email: Yup.string()
                      .email('Must be a valid email')
                      .max(255)
                      .required('Email is required'),
                    firstName: Yup.string()
                      .max(60)
                      .min(3)
                      .required('first name is required'),
                    lastName: Yup.string()
                      .max(60)
                      .min(3)
                      .required('last name is required'),
                    password: Yup.string()
                      .max(255)
                      .required('Password is required'),
                    passwordConfirm: Yup.string()
                      .required('Enter confirm password')
                      .oneOf(
                        [Yup.ref('password'), null],
                        'Passwords must match'
                      ),
                  })}
                  onSubmit={async (
                    values,
                    { setErrors, setStatus, setSubmitting, resetForm }
                  ) => {
                    setSubmitting(true);
                    setLoading(true);
                    const { passwordConfirm: _, ...newObj } = values;
                    dispatch(signup(newObj)).then((res) => {
                      setLoading(false);
                      console.log('res', res);
                      if (res.meta.requestStatus === 'fulfilled') {
                        setSubmitting(false);
                        // toast.success('Email sent, please verify your email');
                        setShowDialog(true);
                        setInfo('Thanks For Joining Us');
                        resetForm();
                      }
                    });
                    try {
                      setStatus({ success: false });
                      setSubmitting(false);
                    } catch (err) {
                      setStatus({ success: false });
                      setErrors({ submit: err.message });
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
                        <Grid item xs={6}>
                          <Stack spacing={1}>
                            <CustomTypo
                              fontFamily='KoHo'
                              variant='subtitle1'
                              htmlFor='email-login'
                            >
                              First Name
                            </CustomTypo>
                            <OutlinedInput
                              id='firstName-login'
                              value={values.firstName}
                              name='firstName'
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder='enter firstName'
                              fullWidth
                              error={Boolean(
                                touched.firstName && errors.firstName
                              )}
                            />
                            {touched.firstName && errors.firstName && (
                              <FormHelperText
                                error
                                id='standard-weight-helper-text-firstName-login'
                              >
                                {errors.firstName}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>
                        <Grid item xs={6}>
                          <Stack spacing={1}>
                            <CustomTypo
                              fontFamily='KoHo'
                              variant='subtitle1'
                              htmlFor='email-login'
                            >
                              Last Name
                            </CustomTypo>
                            <OutlinedInput
                              id='lastName-login'
                              value={values.lastName}
                              name='lastName'
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder='enter lastName'
                              fullWidth
                              error={Boolean(
                                touched.lastName && errors.lastName
                              )}
                            />
                            {touched.lastName && errors.lastName && (
                              <FormHelperText
                                error
                                id='standard-weight-helper-text-lastName-login'
                              >
                                {errors.lastName}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>
                        <Grid item xs={12}>
                          <Stack spacing={1}>
                            <CustomTypo
                              fontFamily='KoHo'
                              variant='subtitle1'
                              htmlFor='email-login'
                            >
                              Email Address
                            </CustomTypo>
                            <OutlinedInput
                              id='email-login'
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
                                id='standard-weight-helper-text-email-login'
                              >
                                {errors.email}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>

                        <Grid item xs={12}>
                          <Stack spacing={1}>
                            <CustomTypo
                              fontFamily='KoHo'
                              variant='subtitle1'
                              htmlFor='password-login'
                            >
                              Password
                            </CustomTypo>
                            <OutlinedInput
                              fullWidth
                              error={Boolean(
                                touched.password && errors.password
                              )}
                              id='-password-login'
                              type={showPassword.password ? 'text' : 'password'}
                              value={values.password}
                              name='password'
                              onBlur={handleBlur}
                              onChange={handleChange}
                              endAdornment={
                                <InputAdornment position='end'>
                                  <IconButton
                                    data-fieldname='password'
                                    aria-label='toggle password visibility'
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge='end'
                                    size='large'
                                  >
                                    {showPassword.password ? (
                                      <VisibilityIcon />
                                    ) : (
                                      <VisibilityOffIcon />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                              placeholder='Enter password'
                            />
                            {touched.password && errors.password && (
                              <FormHelperText
                                error
                                id='standard-weight-helper-text-password-login'
                              >
                                {errors.password}
                              </FormHelperText>
                            )}
                          </Stack>
                        </Grid>
                        <Grid item xs={12}>
                          <Stack spacing={1}>
                            <CustomTypo
                              fontFamily='KoHo'
                              variant='subtitle1'
                              htmlFor='passwordConfirm-login'
                            >
                              Confirm Password
                            </CustomTypo>
                            <OutlinedInput
                              fullWidth
                              error={Boolean(
                                touched.passwordConfirm &&
                                  errors.passwordConfirm
                              )}
                              id='passwordConfirm-login'
                              type={
                                showPassword.passwordConfirm
                                  ? 'text'
                                  : 'password'
                              }
                              value={values.passwordConfirm}
                              name='passwordConfirm'
                              onBlur={handleBlur}
                              onChange={handleChange}
                              endAdornment={
                                <InputAdornment position='end'>
                                  <IconButton
                                    aria-label='toggle passwordConfirm visibility'
                                    data-fieldname='passwordConfirm'
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge='end'
                                    size='large'
                                  >
                                    {showPassword.passwordConfirm ? (
                                      <VisibilityIcon />
                                    ) : (
                                      <VisibilityOffIcon />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                              placeholder='Enter passwordConfirm'
                            />
                            {touched.passwordConfirm &&
                              errors.passwordConfirm && (
                                <FormHelperText
                                  error
                                  id='standard-weight-helper-text-passwordConfirm-login'
                                >
                                  {errors.passwordConfirm}
                                </FormHelperText>
                              )}
                          </Stack>
                        </Grid>

                        {errors.submit && (
                          <Grid item xs={12}>
                            <FormHelperText error>
                              {errors.submit}
                            </FormHelperText>
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
                            {loading ? (
                              <CircularProgress
                                size={25}
                                sx={{ color: 'inherit' }}
                              />
                            ) : (
                              'Register'
                            )}
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  )}
                </Formik>
              </Box>
            </Container>
          </Page>
        </Box>
      </Box>
      <ScrollToTop />
      <Footer />
      {showDialog && (
        <Registeration
          open={showDialog}
          handleClose={() => setShowDialog(false)}
          status={info}
        />
      )}
    </>
  );
};

export default PromoRegisteration;
