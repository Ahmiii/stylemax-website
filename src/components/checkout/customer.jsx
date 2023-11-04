import {
  Box,
  Button,
  FormHelperText,
  FormLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/auth/extraReducers';
import CustomTypo from '../common/CustomTypo';
import InlineLink from '../common/Link';
import TextButton from '../common/TextButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CompletedStep from './completedStep';

const Customer = ({ handleNext, value, userLoggedIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(value);

  return (
    <React.Fragment>
      <Box p={2} sx={{ backgroundColor: (theme) => theme.palette.grey[200] }}>
        <Typography variant='h5' color='secondary'>
          Customer
        </Typography>
      </Box>
      <Box p={3}>
        <Box display='flex' gap={4} flexDirection='column'>
          {userLoggedIn ? (
            <>
              <Box display='flex' gap={3} alignItems='center'>
                <CustomTypo fontFamily='KoHo' color='textPrimary'>
                  {currentUser.email}
                </CustomTypo>
                <TextButton
                  onClick={() => {
                    dispatch(logout());
                    setCurrentUser('');
                  }}
                  label='Logout'
                  size='large'
                />
              </Box>
              <Button
                variant='contained'
                color='primary'
                sx={{ width: 'fit-content' }}
                onClick={() =>
                  handleNext(0, { email: currentUser.email }, 'customer')
                }
              >
                Continue to Shipping
              </Button>
            </>
          ) : (
            <>
              <Box display='flex' alignItems='center' gap={0.5}>
                <CustomTypo variant='body1' fontFamily='KoHo'>
                  Already have an account?
                </CustomTypo>
                <TextButton
                  onClick={() => navigate('/login')}
                  label='Login'
                  size='large'
                />
              </Box>
              <Formik
                initialValues={{
                  email: currentUser?.email || '',
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email('Must be a valid email')
                    .max(95)
                    .required('Email is required'),
                })}
                onSubmit={(values) => {
                  setCurrentUser({ email: values.email });
                  handleNext(0, { email: values.email }, 'customer');
                }}
              >
                {({ errors, handleChange, handleSubmit, touched, values }) => (
                  <form id='custForm' noValidate onSubmit={handleSubmit}>
                    <FormLabel>
                      <CustomTypo
                        fontFamily='KoHo'
                        id='product-view-size'
                        color='textPrimary'
                      >
                        Email
                      </CustomTypo>
                      <OutlinedInput
                        id='email-login'
                        type='email'
                        value={values.email}
                        name='email'
                        onChange={handleChange}
                        placeholder=''
                        fullWidth
                        error={Boolean(touched.email && errors.email)}
                        helperText='By providing your email, you agree to our Privacy Policy and Terms of Services.'
                        sx={{ maxWidth: '450px' }}
                      />
                      <FormHelperText>
                        By providing your email, you agree to our Privacy Policy
                        and Terms of Services.
                      </FormHelperText>
                      {/* <TextField
                        id='outlined-basic'
                        variant='outlined'
                        type='email'
                        nolabel
                        name='email'
                        placeholder='email address'
                        value={values.email}
                        onChange={handleChange}
                        fullWidth
                        helperText='By providing your email, you agree to our Privacy Policy and Terms of Services.'
                      /> */}
                      {/* {touched.email && errors.email && (
                        <FormHelperText error>{errors.email}</FormHelperText>
                      )} */}
                    </FormLabel>
                  </form>
                )}
              </Formik>
              <Button
                variant='contained'
                color='primary'
                sx={{ width: 'fit-content' }}
                type='submit'
                form='custForm'
              >
                Continue to Shipping
              </Button>
            </>
          )}
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Customer;
