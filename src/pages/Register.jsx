import { Formik } from 'formik';
import * as Yup from 'yup';

import React, { useEffect } from 'react';
import Container from '../components/common/Container';
import Page from '../components/common/Page';
import Logo from '../components/Logo/Logo';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InlineLink from '../components/common/Link';
import CustomTypo from '../components/common/CustomTypo';
import { signup } from '../store/slices/auth/extraReducers';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((st) => st.auth);

  useEffect(() => {
    if (user) navigate('/');
  }, []);

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
    <Page title='StyleMax | Register'>
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
              firstName: '',
              lastName: '',
              password: '',
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
              password: Yup.string().max(255).required('Password is required'),
              passwordConfirm: Yup.string()
                .required('Enter confirm password')
                .oneOf([Yup.ref('password'), null], 'Passwords must match'),
            })}
            onSubmit={async (
              values,
              { setErrors, setStatus, setSubmitting }
            ) => {
              setSubmitting(true);
              setLoading(true);
              const { passwordConfirm: _, ...newObj } = values;
              dispatch(signup(newObj)).then((res) => {
                setLoading(false);
                if (res.meta.requestStatus === 'fulfilled') {
                  setSubmitting(false);
                  toast.success('Email sent, please verify your email');
                  navigate('/login');
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
                        error={Boolean(touched.firstName && errors.firstName)}
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
                        error={Boolean(touched.lastName && errors.lastName)}
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
                        error={Boolean(touched.password && errors.password)}
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
                              {showPassword ? (
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
                          touched.passwordConfirm && errors.passwordConfirm
                        )}
                        id='passwordConfirm-login'
                        type={
                          showPassword.passwordConfirm ? 'text' : 'password'
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
                              {showPassword ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        placeholder='Enter passwordConfirm'
                      />
                      {touched.passwordConfirm && errors.passwordConfirm && (
                        <FormHelperText
                          error
                          id='standard-weight-helper-text-passwordConfirm-login'
                        >
                          {errors.passwordConfirm}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  {/* <Grid item xs={12}>
                    <Stack spacing={1}>
                      <CustomTypo
                        fontFamily='KoHo'
                        variant='subtitle1'
                        htmlFor='email-login'
                      >
                        Contact No.
                      </CustomTypo>
                      <OutlinedInput
                        id='contact-login'
                        value={values.contact}
                        name='contact'
                        type='number'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder='Enter contact no'
                        fullWidth
                        error={Boolean(touched.contact && errors.contact)}
                      />
                      {touched.contact && errors.contact && (
                        <FormHelperText
                          error
                          id='standard-weight-helper-text-contact-login'
                        >
                          {errors.contact}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid> */}

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
                      {loading ? (
                        <CircularProgress size={25} sx={{ color: 'inherit' }} />
                      ) : (
                        'Register'
                      )}
                    </Button>
                  </Grid>
                  <Grid item xs={12} sx={{ mt: -1 }}>
                    <Stack
                      direction='row'
                      justifyContent='center'
                      alignItems='end'
                      spacing={2}
                    >
                      <CustomTypo
                        fontFamily='KoHo'
                        variant='h5'
                        sx={{ fontWeight: 500 }}
                      >
                        Already have account?
                      </CustomTypo>
                      <Link
                        variant='h6'
                        component={RouterLink}
                        to='/login'
                        sx={{ textDecoration: 'none' }}
                      >
                        Login
                      </Link>
                    </Stack>
                  </Grid>
                  {/* <Grid item xs={12}>
                    <Divider>
                      <Typography variant='caption'> Login with</Typography>
                    </Divider>
                  </Grid>
                  <Grid item xs={12}>
                    <FirebaseSocial />
                  </Grid> */}
                </Grid>
              </form>
            )}
          </Formik>
        </Box>
      </Container>
    </Page>
  );
};

export default Register;
