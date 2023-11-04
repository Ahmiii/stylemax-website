import {
  Autocomplete,
  Box,
  Button,
  FormHelperText,
  Grid,
  OutlinedInput,
  Stack,
  TextField,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import CustomTypo from '../common/CustomTypo';
import { canadianStates, cities } from '../../utils/canadaCountryData';
import { toast } from 'react-toastify';
import { saveShippingDetails } from '../../api/orders';
import { useSelector } from 'react-redux';

const Shipping = ({ handleNext, activeStep, goToStep, value }) => {
  const [isEditing, setIsEditing] = useState(true);
  const { user, loading } = useSelector((st) => st.auth);

  useEffect(() => {
    if (activeStep === 0) setIsEditing(true);
  }, [activeStep]);

  const initialValues = {
    firstname: value?.firstname || '',
    lastname: value?.lastname || '',
    country: 'Canada',
    address: value?.address || '',
    address2: value?.address2 || '',
    state: value?.state || canadianStates[0],
    city: '',
    zipCode: value?.zipCode || '',
    phoneNumber: value?.phoneNumber || '',
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().max(70).min(3).required('specify first name'),
    lastname: Yup.string().max(70).min(3).required('specify last name'),
    // country: Yup.mixed().required('select country'),
    country: Yup.string(),
    address: Yup.string().max(200).min(3).required('specify address'),
    address2: Yup.string()
      .max(200)
      .min(3)
      .required('specify address - continued'),
    city: Yup.mixed().required('select state'),
    state: Yup.mixed().required('select state'),
    zipCode: Yup.string().required('specify zipcode'),
    phoneNumber: Yup.string().min(10).required('specify phone'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: true,
    onSubmit: async (values) => {
      let shippingDetails = {
        ...values,
        city: values.city.name,
        state: values.state.name,
        isDefault: true,
      };
      saveShippingDetails(shippingDetails)
        .then((res) => {
          values = { ...values, address_id: res.data.id };
          handleNext(1, values, 'shippingAddress');
        })
        .catch((er) => toast.error(er.message));
      // handleNext(1, values, 'shippingAddress');
    },
  });

  // useEffect(() => {
  //   if (formik.values.state !== '') {
  //     const city = cities.filter((el) => el.id === formik.values.state.id)[0]
  //       .cities;
  //     formik.setFieldValue('city', city);
  //   }
  // }, [formik.values.state]);
  useEffect(() => {
    if (formik.values.state !== '') {
      formik.setFieldValue(
        'city',
        cities.filter((el) => el.id === formik.values.state.id)[0].cities[0]
      );
      // setSubCategories(formik.values.category.subCategories[0].label);
    }
  }, [formik.values.category]);

  useEffect(() => {
    if (!user.shippingDetails) return;
    if (!value) {
      formik.setFieldValue('firstname', user.shippingDetails.firstname);
      formik.setFieldValue('lastname', user.shippingDetails.lastname);
      formik.setFieldValue('country', user.shippingDetails.country);
      formik.setFieldValue('address', user.shippingDetails.address);
      formik.setFieldValue('address2', user.shippingDetails.address2);
      formik.setFieldValue(
        'state',
        canadianStates.filter((el) => el.name === user.shippingDetails.state)[0]
      );
      formik.setFieldValue('zipCode', user.shippingDetails.zipCode);
      formik.setFieldValue('phoneNumber', user.shippingDetails.phoneNumber);
      formik.setFieldValue(
        'city',
        cities
          .filter((el) => el.name === user.shippingDetails.state)[0]
          .cities.filter((el) => el.name === user.shippingDetails.city)[0]
      );
    }
  }, [user]);

  return (
    <div>
      <Box
        py={2}
        mb={4}
        pl='60px'
        sx={{ backgroundColor: (theme) => theme.palette.grey[200] }}
      >
        <CustomTypo fontFamily='KoHo' variant='h5' color='secondary'>
          Shipping Address
        </CustomTypo>
      </Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Grid container spacing={2} sx={{ px: '60px', pb: 4 }}>
          <Grid item xs={12} sm={12} md={6}>
            <Stack spacing={0.5}>
              <CustomTypo
                fontFamily='KoHo'
                variant='body2'
                htmlFor='firstname-checkout'
              >
                First Name
              </CustomTypo>
              <OutlinedInput
                id='firstname-checkout'
                type='firstname'
                value={formik.values.firstname}
                name='firstname'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder='first name'
                fullWidth
                size='small'
                error={Boolean(
                  formik.touched.firstname && formik.errors.firstname
                )}
              />
              {formik.touched.firstname && formik.errors.firstname && (
                <FormHelperText
                  error
                  id='standard-weight-helper-text-firstname-checkout'
                >
                  {formik.errors.firstname}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Stack spacing={0.5}>
              <CustomTypo
                fontFamily='KoHo'
                variant='body2'
                htmlFor='lastname-checkout'
              >
                Last Name
              </CustomTypo>
              <OutlinedInput
                id='lastname-checkout'
                type='lastname'
                value={formik.values.lastname}
                name='lastname'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder='last name'
                fullWidth
                size='small'
                error={Boolean(
                  formik.touched.lastname && formik.errors.lastname
                )}
              />
              {formik.touched.lastname && formik.errors.lastname && (
                <FormHelperText
                  error
                  id='standard-weight-helper-text-lastname-checkout'
                >
                  {formik.errors.lastname}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Stack spacing={0.5}>
              <CustomTypo
                fontFamily='KoHo'
                variant='body2'
                htmlFor='country-checkout'
              >
                Country
              </CustomTypo>
              <OutlinedInput
                id='country-checkout'
                type='country'
                value={formik.values.country}
                name='country'
                placeholder='country'
                fullWidth
                size='small'
                readOnly
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Stack spacing={0.5}>
              <CustomTypo
                fontFamily='KoHo'
                variant='body2'
                htmlFor='address-checkout'
              >
                Address
              </CustomTypo>
              <OutlinedInput
                id='address-checkout'
                type='address'
                value={formik.values.address}
                name='address'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder='address'
                fullWidth
                size='small'
                error={Boolean(formik.touched.address && formik.errors.address)}
              />
              {formik.touched.address && formik.errors.address && (
                <FormHelperText
                  error
                  id='standard-weight-helper-text-address-checkout'
                >
                  {formik.errors.address}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Stack spacing={0.5}>
              <CustomTypo
                fontFamily='KoHo'
                variant='body2'
                htmlFor='address-checkout'
              >
                Address - Continued
              </CustomTypo>
              <OutlinedInput
                id='address2-checkout'
                type='address2'
                value={formik.values.address2}
                name='address2'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder='address - continued'
                fullWidth
                size='small'
                error={Boolean(
                  formik.touched.address2 && formik.errors.address2
                )}
              />
              {formik.touched.address2 && formik.errors.address2 && (
                <FormHelperText
                  error
                  id='standard-weight-helper-text-address2-checkout'
                >
                  {formik.errors.address2}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Stack spacing={0.5}>
              <CustomTypo
                fontFamily='KoHo'
                variant='body2'
                htmlFor='state-checkout'
              >
                State
              </CustomTypo>
              <Autocomplete
                id='state'
                name='state'
                options={canadianStates}
                defaultValue={canadianStates[0]}
                getOptionLabel={(option) => option.name}
                onChange={(_, value) => formik.setFieldValue('state', value)}
                renderInput={(params) => (
                  <>
                    <TextField
                      {...params}
                      placeholder='select state'
                      value={formik.values?.state?.id}
                    />
                    {formik.touched.state && formik.errors.state && (
                      <FormHelperText error id='helper-state-checkout'>
                        {formik.errors.state}
                      </FormHelperText>
                    )}
                  </>
                )}
                size='small'
              />
            </Stack>
          </Grid>
          {formik.values.state && (
            <Grid item xs={12} sm={12} md={4}>
              <Stack spacing={0.5}>
                <CustomTypo
                  fontFamily='KoHo'
                  variant='body2'
                  htmlFor='city-checkout'
                >
                  City
                </CustomTypo>
                {/* <Select
                labelId='city-label'
                label='city'
                name='city'
                size='small'
                value={formik.values?.city || ''}
                onChange={formik.handleChange}
                IconComponent={ExpandMoreIcon}
              >
                {formik.values.state !== ''
                  ? cities
                      .filter((el) => el.id === formik.values.state?.id)[0]
                      .cities.map((el) => (
                        <MenuItem key={el.id} value={el.id}>
                          {el.name}
                        </MenuItem>
                      ))
                  : cities[0].cities.map((ele) => (
                      <MenuItem key={ele.id} value={ele.id}>
                        {ele.name}
                      </MenuItem>
                    ))}
              </Select> */}
                <Autocomplete
                  id='city'
                  name='city'
                  options={
                    cities?.filter(
                      (el) => el.id === formik?.values?.state?.id
                    )[0]?.cities
                  }
                  defaultValue={
                    cities.filter((el) => el.id === formik.values.state.id)[0]
                      .cities[0]
                  }
                  getOptionLabel={(option) => option.name}
                  onChange={(_, value) => formik.setFieldValue('city', value)}
                  renderInput={(params) => (
                    <>
                      <TextField
                        {...params}
                        placeholder='select city'
                        value={formik.values?.city?.id}
                      />
                      {formik.touched.city && formik.errors.city && (
                        <FormHelperText error id='helper-city-checkout'>
                          {formik.errors.city}
                        </FormHelperText>
                      )}
                    </>
                  )}
                  size='small'
                />
              </Stack>
              {/* <Stack spacing={0.5}>
              <CustomTypo
                fontFamily='KoHo'
                variant='body2'
                htmlFor='city-checkout'
              >
                City
              </CustomTypo>
              <OutlinedInput
                id='city-checkout'
                type='city'
                value={formik.values.city}
                name='city'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder='city'
                fullWidth
                size='small'
                error={Boolean(formik.touched.city && formik.errors.city)}
              />
              {formik.touched.city && formik.errors.city && (
                <FormHelperText
                  error
                  id='standard-weight-helper-text-city-checkout'
                >
                  {formik.errors.city}
                </FormHelperText>
              )}
            </Stack> */}
            </Grid>
          )}

          <Grid item xs={12} sm={12} md={4}>
            <Stack spacing={0.5}>
              <CustomTypo
                fontFamily='KoHo'
                variant='body2'
                htmlFor='zipcode-checkout'
              >
                Zip Code
              </CustomTypo>
              <OutlinedInput
                id='zipCode-checkout'
                value={formik.values.zipCode}
                name='zipCode'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder='zipCode'
                fullWidth
                size='small'
                error={Boolean(formik.touched.zipCode && formik.errors.zipCode)}
              />
              {formik.touched.zipCode && formik.errors.zipCode && (
                <FormHelperText
                  error
                  id='standard-weight-helper-text-zipCode-checkout'
                >
                  {formik.errors.zipCode}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Stack spacing={0.5}>
              <CustomTypo
                fontFamily='KoHo'
                variant='body2'
                htmlFor='phone-checkout'
              >
                Phone
              </CustomTypo>
              <OutlinedInput
                id='phone-checkout'
                type='string'
                value={formik.values.phoneNumber}
                name='phoneNumber'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder='phone number'
                fullWidth
                size='small'
                error={Boolean(
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                )}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <FormHelperText
                  error
                  id='standard-weight-helper-text-phoneNumber-checkout'
                >
                  {formik.errors.phoneNumber}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box mt={3}>
              <Button variant='contained' color='primary' type='submit'>
                Continue to Payment
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Shipping;
