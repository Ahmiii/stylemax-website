import { Formik } from 'formik';
import * as Yup from 'yup';

import React, { useEffect } from 'react';
import CustomTypo from '../components/common/CustomTypo';
import Container from '../components/common/Container';
import Page from '../components/common/Page';
import Logo from '../components/Logo/Logo';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import InlineLink from '../components/common/Link';
import {
  Button,
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

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import API_URL from '../config';

const ResetPassword = () => {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    const user_id = searchParams.get('user_id');
    if (code) setCode(code);
    if (user_id) setUserId(user_id);
  }, [location.search]);

  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [userId, setUserId] = React.useState(null);
  const [code, setCode] = React.useState(null);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Page title='StyleMax | Reset Password'>
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
              password: 'pass1234',
              submit: null,
            }}
            validationSchema={Yup.object().shape({
              password: Yup.string().max(255).required('Password is required'),
            })}
            onSubmit={async (
              values,
              { setErrors, setStatus, setSubmitting }
            ) => {
              if (!userId || !code) {
                toast.error('Invalid link');
                return;
              }
              setLoading(true);
              setSubmitting(true);

              try {
                const response = await axios.post(
                  `${API_URL}/verify/reset-password`,
                  {
                    code,
                    user_id: userId,
                    new_password: values.password,
                  }
                );
                setLoading(false);
                toast.success('Password reset successfully');
                navigate('/login');
              } catch (err) {
                toast.error(err.message);
                setSubmitting(false);
                setLoading(false);
              }

              try {
                // setStatus({ success: false });
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
                      justifyContent='end'
                      alignItems='center'
                    >
                      <InlineLink
                        variant='h6'
                        component={RouterLink}
                        to='/forgotpassword'
                        color='text.primary'
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
                        <CircularProgress sx={{ color: 'inherit' }} />
                      ) : (
                        'Reset Password'
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
  );
};

export default ResetPassword;
