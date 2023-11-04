import { Formik } from 'formik';
import * as Yup from 'yup';

import React, { useEffect } from 'react';
import Container from '../components/common/Container';
import Page from '../components/common/Page';
import Logo from '../components/Logo/Logo';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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

import InlineLink from '../components/common/Link';
import CustomTypo from '../components/common/CustomTypo';

import { getShippingDetails, login } from '../store/slices/auth/extraReducers';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { getMyFav } from '../store/slices/favourite/extraReducers';
import { getCart } from '../store/slices/cart/extraReducers';

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { user } = useSelector((st) => st.auth);

  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (user) navigate('/');
  }, []);

  let redirect = location.search ? location.search.split('=')[1] : '/';

  return (
    <Page title='StyleMax | Login'>
      <Container>
        <Box
          display='flex'
          flexDirection='column'
          gap={2}
          maxWidth='500px'
          mx='auto'
        >
          <Box mx='auto' width='250px' mb={5}>
            <Logo />
          </Box>
          <Formik
            initialValues={{
              email: '',
              password: '',
              submit: null,
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              password: Yup.string().max(255).required('Password is required'),
            })}
            onSubmit={async (
              values,
              { setErrors, setStatus, setSubmitting }
            ) => {
              setLoading(true);
              dispatch(
                login({ email: values.email, password: values.password })
              ).then((res) => {
                setLoading(false);

                if (res.meta.requestStatus === 'fulfilled') {
                  dispatch(getMyFav());
                  dispatch(getCart());
                  dispatch(getShippingDetails());
                  location.search !== ''
                    ? navigate(`${redirect}`)
                    : navigate('/');
                }
              });
              setSubmitting(true);
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
                        type={showPassword ? 'text' : 'password'}
                        value={values.password}
                        name='password'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
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

                  <Grid item xs={12} sx={{ mt: -1 }}>
                    <Stack
                      direction='row'
                      justifyContent='space-between'
                      alignItems='center'
                    >
                      <InlineLink
                        variant='h6'
                        component={RouterLink}
                        to='/verify-email'
                        color='text.primary'
                      >
                        Verify Email?
                      </InlineLink>
                      <InlineLink
                        variant='h6'
                        component={RouterLink}
                        to='/forgotpassword'
                        color='text.primary'
                        sx={{ marginLeft: 'auto' }}
                      >
                        Forgot Password?
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
                      {loading ? (
                        <CircularProgress
                          size={25}
                          sx={{
                            color: 'inherit',
                          }}
                        />
                      ) : (
                        'Login'
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
                        Don't have account?
                      </CustomTypo>
                      <Link
                        variant='h6'
                        to='/register'
                        component={RouterLink}
                        sx={{ textDecoration: 'none' }}
                      >
                        Register
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

export default Login;
