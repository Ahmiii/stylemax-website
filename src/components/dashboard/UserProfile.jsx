import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  OutlinedInput,
  Stack,
} from '@mui/material';
import React, { useState } from 'react';
import CustomTypo from '../common/CustomTypo';
import userImg from '../../assets/user1.png';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, updateUserEmail } from '../../api/users';
import {
  updateProfilePicture,
  updateUserName,
} from '../../store/slices/auth/extraReducers';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { remoteUrl } from '../../api';

const UserProfile = () => {
  const { user, loading } = useSelector((st) => st.auth);
  const [emailLoading, setEmailLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    address: user?.address || '',
    email: user?.email || '',
    role: user?.role || '--',
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Must be a valid email')
      .max(255)
      .required('Email is required'),
    address: Yup.string().max(200).min(3).required('specify address'),
    contactNo: Yup.string().min(10).required('specify phone'),
    role: Yup.string(),
  });

  const formikForName = useFormik({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().max(70).min(3).required('specify first name'),
      lastName: Yup.string().max(70).min(3).required('specify last name'),
    }),
    onSubmit: (values) => {
      dispatch(updateUserName(values));
    },
  });

  const formikForEmail = useFormik({
    initialValues: {
      email: user?.email || '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
    }),
    onSubmit: (values) => {
      setEmailLoading(true);
      updateUserEmail(values)
        .then((res) => toast.success(res.data.message))
        .catch((er) => toast.err(er.message))
        .finally(() => setEmailLoading(false));
    },
  });

  const handleImageUpload = async (e) => {
    const selectedFile = await e.target.files[0];
    if (selectedFile) {
      let formData = new FormData();
      formData.append('picture', selectedFile);
      dispatch(updateProfilePicture(formData));
    }
  };

  return (
    <React.Fragment>
      <Box display='flex' alignItems='center' gap={4} px={1} mb={5}>
        <Box position='relative'>
          <Avatar
            alt='Remy Sharp'
            src={user?.picture ? `${remoteUrl}${user.picture}` : userImg}
            sx={{
              width: 100,
              height: 100,
              border: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          />

          <IconButton
            size='small'
            color='primary'
            sx={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              backgroundColor: 'white',
              boxShadow:
                'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
              '&:hover': {
                backgroundColor: (theme) => theme.custom.menuBtnSelec,
              },
            }}
            aria-label='upload picture'
            component='label'
          >
            <CameraAltIcon />
            <input
              hidden
              accept='image/*'
              type='file'
              disabled={loading}
              onChange={(e) =>
                handleImageUpload(e, (img) => {
                  formik.setFieldValue('image', img);
                })
              }
            />
          </IconButton>
        </Box>
        <Box display='flex' flexDirection='column' justifyContent='end'>
          <CustomTypo fontFamily='KoHo' variant='h4'>
            Profile
          </CustomTypo>
          <CustomTypo fontFamily='KoHo' variant='subtitle1'>
            Update your photo and personal details
          </CustomTypo>
        </Box>
      </Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formikForName.handleSubmit();
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <CustomTypo
              fontFamily='KoHo'
              variant='h6'
              htmlFor='firstName-profile'
              sx={{ marginBottom: '1rem' }}
            >
              Change Name
            </CustomTypo>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Stack spacing={0.5}>
              <CustomTypo
                fontFamily='KoHo'
                variant='body2'
                htmlFor='firstName-profile'
              >
                First Name
              </CustomTypo>
              <OutlinedInput
                id='firstName-profile'
                value={formikForName.values.firstName}
                name='firstName'
                onBlur={formikForName.handleBlur}
                onChange={formikForName.handleChange}
                placeholder='first name'
                fullWidth
                size='small'
                error={Boolean(
                  formikForName.touched.firstName &&
                    formikForName.errors.firstName
                )}
              />
              {formikForName.touched.firstName &&
                formikForName.errors.firstName && (
                  <FormHelperText
                    error
                    id='standard-weight-helper-text-firstName-profile'
                  >
                    {formikForName.errors.firstName}
                  </FormHelperText>
                )}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Stack spacing={0.5}>
              <CustomTypo
                fontFamily='KoHo'
                variant='body2'
                htmlFor='lastName-profile'
              >
                Last Name
              </CustomTypo>
              <OutlinedInput
                id='lastName-profile'
                value={formikForName.values.lastName}
                name='lastName'
                onBlur={formikForName.handleBlur}
                onChange={formikForName.handleChange}
                placeholder='Last name'
                fullWidth
                size='small'
                error={Boolean(
                  formikForName.touched.lastName &&
                    formikForName.errors.lastName
                )}
              />
              {formikForName.touched.lastName &&
                formikForName.errors.lastName && (
                  <FormHelperText
                    error
                    id='standard-weight-helper-text-lastName-profile'
                  >
                    {formikForName.errors.lastName}
                  </FormHelperText>
                )}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Stack spacing={0.5} alignItems='end'>
              <CustomTypo
                fontFamily='KoHo'
                variant='body2'
                sx={{ height: '23px' }}
              />
              <Button
                variant='contained'
                type='submit'
                disabled={loading}
                sx={{ minWidth: '123px' }}
              >
                {loading ? (
                  <CircularProgress color='primary' size={20} />
                ) : (
                  'Update Name'
                )}
              </Button>
            </Stack>
          </Grid>

          <Box my={4}>
            <Divider />
          </Box>
        </Grid>
      </form>
      <Box my={4}>
        <Divider />
      </Box>

      <form onSubmit={formikForEmail.handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <CustomTypo
              fontFamily='KoHo'
              variant='h6'
              htmlFor='firstName-profile'
              sx={{ marginBottom: '1rem' }}
            >
              Change Email
            </CustomTypo>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Stack spacing={0.5}>
              <CustomTypo
                fontFamily='KoHo'
                variant='body2'
                htmlFor='email-profile'
              >
                Email
              </CustomTypo>
              <OutlinedInput
                id='email-profile'
                value={formikForEmail.values.email}
                name='email'
                type='email'
                onBlur={formikForEmail.handleBlur}
                onChange={formikForEmail.handleChange}
                placeholder='Email'
                fullWidth
                size='small'
                error={Boolean(
                  formikForEmail.touched.email && formikForEmail.errors.email
                )}
              />
              {formikForEmail.touched.email && formikForEmail.errors.email && (
                <FormHelperText
                  error
                  id='standard-weight-helper-text-email-profile'
                >
                  {formikForEmail.errors.email}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Stack spacing={0.5} alignItems='end'>
              <CustomTypo
                fontFamily='KoHo'
                variant='body2'
                sx={{ height: '23px' }}
              />
              <Button
                variant='contained'
                type='submit'
                disabled={emailLoading}
                sx={{ minWidth: '123px' }}
              >
                {emailLoading ? (
                  <CircularProgress color='primary' size={20} />
                ) : (
                  'Update Email'
                )}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>

      <Box my={4}>
        <Divider />
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <CustomTypo
            fontFamily='KoHo'
            variant='h6'
            htmlFor='firstName-profile'
            sx={{ marginBottom: '1rem' }}
          >
            Change Password
          </CustomTypo>
        </Grid>
        <Grid item xs={12}>
          <Button
            // size='large'
            type='submit'
            variant='contained'
            sx={{ minWidth: '175px' }}
            onClick={() => {
              navigate('/forgotpassword');
            }}
          >
            Update Password
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default UserProfile;
