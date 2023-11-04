import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
// import

import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Radio,
  Select,
  Stack,
  styled,
  TextField,
} from '@mui/material';

import Container from '../components/common/Container';
import CustomTypo from '../components/common/CustomTypo';
import Page from '../components/common/Page';

import StarRateIcon from '@mui/icons-material/StarRate';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import { remoteUrl } from '../api';
import { toast } from 'react-toastify';
import { getAccessToken } from '../api/users';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories } from '../store/slices/category/extraReducers';
import ConditionField from '../components/createListing/conditionField';
import EasyCrop from '../components/imageCrop/EasyCrop';
import CropIcon from '@mui/icons-material/Crop';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoneIcon from '@mui/icons-material/Done';
const discount = [
  { label: 'No Discount', value: 'stdrd_no_discount' },
  { label: '25% Discount', value: 'stdrd_25_discount' },
  { label: '50% Discount', value: 'stdrd_50_discount' },
  { label: 'FREE', value: 'stdrd_free' },
];

const calcEarning = (offeredPrice, discount) => {
  if (discount === 'stdrd_no_discount')
    return offeredPrice - 0.15 * offeredPrice;
  if (discount === 'stdrd_25_discount')
    return offeredPrice - 0.15 * offeredPrice - (25 / 100) * 20;
  if (discount === 'stdrd_50_discount')
    return offeredPrice - 0.15 * offeredPrice - 20 / 2;
  if (discount === 'stdrd_free') return offeredPrice - 0.15 * offeredPrice - 20;
};

const calcShipping = (discount) => {
  if (discount === 'stdrd_no_discount') return 0;
  if (discount === 'stdrd_50_discount') return 20 / 2;
  if (discount === 'stdrd_25_discount') return (25 / 100) * 20;
  if (discount === 'stdrd_free') return 20;
};
function moveIndexToFirst(arr, targetIndex) {
  if (targetIndex < 0 || targetIndex >= arr.length) return arr;
  const obj = arr.splice(targetIndex, 1)[0];
  arr.unshift(obj);
  return arr;
}

function removeElementAndUpdateDefault(arr, index) {
  if (index === -1 || arr.length === 0) return -1;
  arr.splice(index, 1);
  if (arr.length === 0) return -1;
  const randomIndex = Math.floor(Math.random() * arr.length);
  return randomIndex;
}

const CreateListing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submitloading, setLoading] = useState(false);
  const [apiColors, setAPIColors] = useState([]);
  const [apiSizes, setAPISizes] = useState([]);
  const { brands } = useSelector((st) => st.brand);

  const { categories } = useSelector((st) => st.category);
  React.useEffect(() => {
    if (!categories) dispatch(getAllCategories());
  }, [categories]);

  const [toCrop, setToCrop] = useState(null);
  const [openCropDial, setOpenCropDial] = useState(false);
  const [defaultImage, setDefaultImage] = useState(0);

  const initialValues = {
    images: [],
    title: '',
    description: '',
    category: '',
    subcategory: '',
    subcategoryValues: [],
    subSubCategory: '',
    quantity: 'single',
    size: '',
    quantityAvailable: '',
    brand: brands?.[0].id || '',
    color: '',
    condition: 'New',
    style: '',
    origPrice: '',
    offeredPrice: '',
    yourEarnings: 0,
    tag0: '',
    tag1: '',
    tag2: '',
    delivery_type: 'standard',
    discountMenu: discount[0].value,
    sellingFee: 0,
    shippingFee: 20,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().max(120).min(3).required('specify item title/summary'),
    images: Yup.array()
      .min(2, 'upload at least 2 images')
      .max(4, 'upload max 4 images'),
    origPrice: Yup.number().required('specify orignal price'),
    quantity: Yup.string(),
    offeredPrice: Yup.number()
      .required('specify offered price')
      .max(
        Yup.ref('origPrice'),
        'Offered Price should be less than or equal to orignal price'
      ),
    yourEarnings: Yup.number(),
    category: Yup.mixed().required('select category'),
    subcategory: Yup.mixed().when('category', (category, schema) => {
      if (category === '') return schema;
      else return schema.required('select subcategory');
    }),
    size: Yup.mixed().required('select size'),
    quantityAvailable: Yup.number().when('quantity', (quantity, schema) => {
      if (quantity?.[0] === 'single') return schema;
      else return schema.required('Specify the Quantity Available');
    }),
    tag0: Yup.string(),
    tag1: Yup.string(),
    tag2: Yup.string(),
    delivery_type: Yup.string(),
    discountMenu: Yup.mixed(),
    sellingFee: Yup.number(),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: true,
    onSubmit: async (values) => {
      setLoading(true);

      let tags = [values.tag0, values.tag1, values.tag2];

      const getImages = moveIndexToFirst([...values.images], defaultImage);

      const formData = new FormData();
      formData.append('label', values.title);
      formData.append(
        'description',
        values.description ? values.description : 'Description not available'
      );
      formData.append('price', values.origPrice);
      formData.append(
        'sub_category',
        values.subSubCategory === ''
          ? values.subcategory
          : values.subSubCategory
      );
      formData.append('colours', JSON.stringify([values.color]));
      formData.append('tags', JSON.stringify(tags));
      formData.append('condition', values.condition);
      formData.append('sizes', JSON.stringify([values.size]));
      formData.append('stock', values.quantityAvailable || 1);
      formData.append('offeredPrice', values.offeredPrice);
      formData.append(
        'brand',
        typeof values.brand === 'number'
          ? JSON.stringify({ id: values.brand })
          : JSON.stringify({ newBrand: values.brand })
      );

      formData.append('currency', 'USD');

      formData.append('style', 'casual');
      formData.append('material', 'material-1');
      formData.append('delivery_type', values.discountMenu);
      formData.append('product_status', values.status);
      if (getImages.length > 0) {
        const imagesArr = getImages.map((obj) => obj.file);
        for (let i = 0; i < imagesArr.length; i++) {
          formData.append('pictures', imagesArr[i]);
        }
      } else formData.append('pictures', []);

      try {
        const response = await axios.post(
          `${remoteUrl}/product?access_token=${getAccessToken()}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        setLoading(false);

        if (response.status === 200) {
          toast.success('Product created successfully');
          navigate('/products');
        }
      } catch (err) {
        toast.error(err.response.data ?? err.message);
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (formik.values.category !== '') formik.setFieldValue('subcategory', '');
  }, [formik.values.category]);

  React.useEffect(() => {
    formik.setFieldValue(
      'shippingFee',
      calcShipping(formik.values.discountMenu)
    );
    if (formik.values.offeredPrice > 0) {
      formik.setFieldValue(
        'sellingFee',
        (formik.values.offeredPrice * 15) / 100
      );
      formik.setFieldValue(
        'yourEarnings',
        calcEarning(
          formik.values.offeredPrice,
          formik.values.discountMenu
        ).toFixed(2)
      );
    } else
      formik.setFieldValue(
        'yourEarnings',
        calcShipping(formik.values.discountMenu)
      );
  }, [formik.values.offeredPrice, formik.values.discountMenu]);

  const handleImageUpload = async (e) => {
    const filesLength = e.target.files.length >= 5 ? 4 : e.target.files.length;

    const imgs = [];
    if (filesLength > 0)
      for (let i = 0; i < filesLength; i++) {
        const selectedFile = await e.target.files[i];
        if (i === 0) setDefaultImage(0);
        imgs.push({
          url: URL.createObjectURL(selectedFile),
          file: selectedFile,
        });
      }
    formik.setFieldValue('images', [...formik.values.images, ...imgs]);
  };

  const saveImageInFormik = (img) => {
    const newImages = [...formik.values.images];

    newImages.splice(toCrop.index, 1);
    formik.setFieldValue('images', [
      ...newImages,
      { url: URL.createObjectURL(img.file), file: img.file },
    ]);
  };

  const removeImage = (index) => {
    const newImages = [...formik.values.images];
    newImages.splice(index, 1);

    setDefaultImage(
      removeElementAndUpdateDefault(formik.values.images, index, -1)
    );

    formik.setFieldValue('images', newImages);
  };

  const cropImage = (index) => {
    const newImages = [...formik.values.images];
    setToCrop({ index, img: newImages[index].url });
    setOpenCropDial(true);
  };

  const changeCondition = (val) => {
    formik.setFieldValue('condition', val);
  };

  return (
    <Page title='StyleMax | Create Listing'>
      <Container>
        <form onSubmit={(e) => e.preventDefault()}>
          <OutlinedBox display='flex' flexDirection='column' gap={1}>
            <CustomTypo variant='h4' fontFamily='KoHo'>
              Add Item for Sale
            </CustomTypo>
            <Divider />
            <Grid container spacing={3.5} mt={0}>
              <Grid item xs={12} sm={3} md={3}>
                <Box pt={1} alignItems='center' display='flex' gap={1}>
                  <CustomTypo variant='h6' fontFamily='KoHo'>
                    Add up to 4 photos
                  </CustomTypo>
                  <StarRateIcon sx={{ fontSize: '1rem' }} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={9} md={9}>
                <OutlinedBox
                  display='grid'
                  minHeight='170px'
                  sx={{
                    ...(formik.touched.images &&
                      formik.errors.images && {
                        border: (theme) =>
                          `1px solid ${theme.palette.error.main}`,
                      }),
                  }}
                >
                  {formik.values.images.length > 0 ? (
                    <>
                      <ImageGrid>
                        {formik.values.images.map((el, index) => (
                          <div key={index} style={{ position: 'relative' }}>
                            <img src={el.url} width='100%' height='100%' />
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem',
                                position: 'absolute',
                                top: 4,
                                right: 4,
                              }}
                            >
                              <IconButton
                                style={{
                                  background: 'red',
                                  color: 'white',
                                }}
                                onClick={() => removeImage(index)}
                              >
                                <CloseIcon />
                              </IconButton>
                              <IconButton
                                style={{
                                  background: 'blue',
                                  color: 'white',
                                }}
                                onClick={() => cropImage(index)}
                              >
                                <CropIcon />
                              </IconButton>
                              {defaultImage === index && (
                                <IconButton
                                  sx={{
                                    backgroundColor: (theme) =>
                                      theme.palette.success.light,
                                    '&:hover': {
                                      backgroundColor: (theme) =>
                                        theme.palette.success.light,
                                    },
                                    color: 'white',
                                  }}
                                >
                                  <DoneIcon />
                                </IconButton>
                              )}
                              {defaultImage !== index && (
                                <IconButton
                                  sx={{
                                    backgroundColor: (theme) =>
                                      theme.palette.secondary.light,
                                    '&:hover': {
                                      backgroundColor: (theme) =>
                                        theme.palette.success.light,
                                    },
                                    color: 'white',
                                  }}
                                  onClick={() => setDefaultImage(index)}
                                >
                                  <DoneIcon />
                                </IconButton>
                                // <IconButton
                                //   style={{
                                //     backgroundColor: 'blue',
                                //     color: 'white',
                                //   }}
                                //   onClick={() => cropImage(index)}
                                // >
                                //   <CropIcon />
                                // </IconButton>
                              )}
                            </Box>
                          </div>
                        ))}
                        <Box
                          display='flex'
                          gap={2}
                          flexDirection='column'
                          justifyContent='center'
                          alignItems='center'
                          sx={{
                            background: (theme) => theme.palette.divider,
                          }}
                          aria-label='upload picture'
                          component='label'
                        >
                          <AddIcon sx={{ fontSize: '1rem' }} />
                          <CustomTypo
                            fontFamily='KoHo'
                            variant='subtitle1'
                            component='label'
                          >
                            Add Photo
                          </CustomTypo>
                          <input
                            hidden
                            accept='image/*'
                            type='file'
                            disabled={formik.values.images.length === 4}
                            onChange={(e) =>
                              handleImageUpload(e, (img) => {
                                formik.setFieldValue('image', img);
                              })
                            }
                            multiple
                          />
                        </Box>
                      </ImageGrid>
                    </>
                  ) : (
                    <Box
                      display='flex'
                      alignItems='center'
                      justifyContent='center'
                      height='100%'
                    >
                      <Button
                        variant='contained'
                        color='secondary'
                        sx={{ minWidth: { xs: 'unset', sm: '200px' } }}
                        // onClick={handleImageUpload}
                        aria-label='upload picture'
                        component='label'
                        disabled={formik.values.images.length === 4}
                      >
                        Add Photos
                        <input
                          hidden
                          accept='image/*'
                          type='file'
                          disabled={formik.values.images.length === 4}
                          onChange={(e) =>
                            handleImageUpload(e, (img) => {
                              formik.setFieldValue('image', img);
                            })
                          }
                          multiple
                        />
                      </Button>
                    </Box>
                  )}
                </OutlinedBox>
                {formik.touched.images && formik.errors.images && (
                  <FormHelperText error id='helper-images-listing'>
                    {formik.errors.images}
                  </FormHelperText>
                )}
              </Grid>
              {/* Title/ Summary */}
              <Grid item xs={12} sm={3} md={3}>
                <Box pb={0.5} pt={1} alignItems='center' display='flex' gap={1}>
                  <CustomTypo variant='h6' fontFamily='KoHo'>
                    Title/Summary
                  </CustomTypo>
                  <StarRateIcon sx={{ fontSize: '1rem' }} />
                </Box>
                <CustomTypo variant='body1' fontFamily='KoHo'>
                  Mention details like Brand, Size and Color
                </CustomTypo>
              </Grid>
              <Grid item xs={12} sm={9} md={9}>
                <Stack spacing={1}>
                  <OutlinedInput
                    id='title-listing'
                    value={formik.values.title}
                    name='title'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    fullWidth
                    error={Boolean(formik.touched.title && formik.errors.title)}
                  />
                  {formik.touched.title && formik.errors.title && (
                    <FormHelperText error id='helper-title-listing'>
                      {formik.errors.title}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {/* Description */}
              <Grid item xs={12} sm={3} md={3}>
                <Box pb={0.5} pt={1} alignItems='center' display='flex' gap={1}>
                  <CustomTypo variant='h6' fontFamily='KoHo'>
                    Description
                  </CustomTypo>
                  <StarRateIcon sx={{ fontSize: '1rem' }} />
                </Box>
                <CustomTypo variant='body1' fontFamily='KoHo'>
                  Add Product Description with comma separated
                </CustomTypo>
              </Grid>
              <Grid item xs={12} sm={9} md={9}>
                <Stack spacing={1}>
                  <OutlinedInput
                    id='title-listing'
                    value={formik.values.description}
                    name='description'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    fullWidth
                    multiline
                    rows={7}
                    error={Boolean(
                      formik.touched.description && formik.errors.description
                    )}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <FormHelperText error id='helper-description-listing'>
                      {formik.errors.description}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {/* Category */}
              <Grid item xs={12} sm={3} md={3}>
                <Box pb={0.5} pt={1} alignItems='center' display='flex' gap={1}>
                  <CustomTypo variant='h6' fontFamily='KoHo'>
                    Category
                  </CustomTypo>
                  <StarRateIcon sx={{ fontSize: '1rem' }} />
                </Box>
                <CustomTypo variant='body1' fontFamily='KoHo'>
                  Select category to find your items quickly.
                </CustomTypo>
              </Grid>
              <Grid item xs={12} sm={9} md={9}>
                <Box display='flex' gap={3}>
                  <Autocomplete
                    id='category'
                    name='category'
                    options={categories}
                    sx={{ width: 300 }}
                    getOptionLabel={(option) => option.label}
                    onChange={(_, value) => {
                      if (!value) formik.setFieldValue('category', '');
                      else formik.setFieldValue('category', value);
                    }}
                    renderInput={(params) => (
                      <>
                        <TextField
                          {...params}
                          placeholder='Select Category'
                          value={formik.values?.category}
                        />
                        {formik.touched.category && formik.errors.category && (
                          <FormHelperText error id='helper-category-listing'>
                            {formik.errors.category}
                          </FormHelperText>
                        )}
                      </>
                    )}
                  />
                  {formik.values.category !== '' && (
                    <Autocomplete
                      id='subcategory'
                      name='subcategory'
                      options={formik?.values?.category?.subCategories?.filter(
                        (cat) => cat?.parent_subcategory === null
                      )}
                      sx={{ width: 300 }}
                      getOptionLabel={(option) => option.label}
                      onChange={(_, value) => {
                        formik.setFieldValue('subcategory', value.id);
                        formik.setFieldValue(
                          'subcategoryValues',
                          formik?.values?.category?.subCategories.filter(
                            (subcat) =>
                              subcat.parent_subcategory &&
                              subcat.parent_subcategory.id === value.id
                          )
                        );
                        setAPIColors(value.colours);
                        setAPISizes(value.sizes);
                      }}
                      renderInput={(params) => (
                        <>
                          <TextField
                            {...params}
                            placeholder='Select Subcategory'
                            value={formik.values?.subcategory}
                          />
                          {formik.touched.subcategory &&
                            formik.errors.subcategory && (
                              <FormHelperText
                                error
                                id='helper-subcategory-listing'
                              >
                                {formik.errors.subcategory}
                              </FormHelperText>
                            )}
                        </>
                      )}
                    />
                  )}
                  {formik.values.subcategoryValues.length !== 0 &&
                    formik.values.category !== '' && (
                      <Autocomplete
                        id='subSubCategory'
                        name='subSubCategory'
                        options={formik?.values?.subcategoryValues}
                        sx={{ width: 300 }}
                        getOptionLabel={(option) => option.label}
                        onChange={(_, value) => {
                          formik.setFieldValue('subSubCategory', value.id);
                          setAPIColors(value.colours);
                          setAPISizes(value.sizes);
                        }}
                        renderInput={(params) => (
                          <>
                            <TextField
                              {...params}
                              placeholder='Select Sub Subcategory'
                              value={formik.values?.subcategory}
                            />
                            {formik.touched.subcategory &&
                              formik.errors.subcategory && (
                                <FormHelperText
                                  error
                                  id='helper-subcategory-listing'
                                >
                                  {formik.errors.subcategory}
                                </FormHelperText>
                              )}
                          </>
                        )}
                      />
                    )}
                </Box>
              </Grid>
              {/* Quantity */}
              <Grid item xs={12} sm={3} md={3}>
                <Box pb={0.5} pt={1} alignItems='center' display='flex' gap={1}>
                  <CustomTypo variant='h6' fontFamily='KoHo'>
                    Quantity
                  </CustomTypo>
                  <StarRateIcon sx={{ fontSize: '1rem' }} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={9} md={9}>
                <Box display='flex' gap={3}>
                  <QuanButton
                    selected={formik.values.quantity === 'single'}
                    onClick={() => formik.setFieldValue('quantity', 'single')}
                  >
                    <CustomTypo fontFamily='KoHo' variant='subtitle1'>
                      Single Item
                    </CustomTypo>
                  </QuanButton>
                  <QuanButton
                    selected={formik.values.quantity === 'multiple'}
                    onClick={() => formik.setFieldValue('quantity', 'multiple')}
                  >
                    <CustomTypo fontFamily='KoHo' variant='subtitle1'>
                      Multi Items
                    </CustomTypo>
                  </QuanButton>
                </Box>
              </Grid>
              {/* Size */}
              <Grid item xs={12} sm={3} md={3}>
                <Box pb={0.5} pt={1} alignItems='center' display='flex' gap={1}>
                  <CustomTypo variant='h6' fontFamily='KoHo'>
                    Size
                  </CustomTypo>
                  <StarRateIcon sx={{ fontSize: '1rem' }} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={9} md={9}>
                <Box
                  display='flex'
                  flexWrap='wrap'
                  columnGap={3}
                  maxWidth='600px'
                  sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
                >
                  <Stack flex={1}>
                    <CustomTypo fontFamily='KoHo' variant='h6'>
                      Size
                    </CustomTypo>
                    <Autocomplete
                      id='size'
                      name='size'
                      options={apiSizes}
                      sx={{ width: 300 }}
                      getOptionLabel={(option) => option.label}
                      onChange={(_, value) => {
                        if (!value) formik.setFieldValue('size', '');
                        else formik.setFieldValue('size', value);
                      }}
                      renderInput={(params) => (
                        <>
                          <TextField
                            {...params}
                            placeholder='Select Size'
                            onChange={formik.handleChange}
                            value={formik.values?.size?.value}
                          />
                          {formik.touched.size && formik.errors.size && (
                            <FormHelperText error id='helper-size-listing'>
                              {formik.errors.size}
                            </FormHelperText>
                          )}
                        </>
                      )}
                    />
                  </Stack>
                  {formik.values.quantity === 'multiple' && (
                    <Stack flex={1} minWidth='180px' maxWidth='300px'>
                      <CustomTypo fontFamily='KoHo' variant='h6'>
                        Quantity Available
                      </CustomTypo>
                      <OutlinedInput
                        id='quantityAvailable-listing'
                        value={formik.values.quantityAvailable}
                        name='quantityAvailable'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        fullWidth
                        placeholder='Quantity'
                        error={Boolean(
                          formik.touched.quantityAvailable &&
                            formik.errors.quantityAvailable
                        )}
                      />
                      {formik.touched.quantityAvailable &&
                        formik.errors.quantityAvailable && (
                          <FormHelperText
                            error
                            id='helper-quantityAvailable-listing'
                          >
                            {formik.errors.quantityAvailable}
                          </FormHelperText>
                        )}
                    </Stack>
                  )}
                </Box>
              </Grid>

              {/* Brand */}
              <Grid item xs={12} sm={3} md={3}>
                <Box pb={0.5} pt={1}>
                  <CustomTypo variant='h6' fontFamily='KoHo'>
                    Brand
                  </CustomTypo>
                </Box>
              </Grid>
              <Grid item xs={12} sm={9} md={9}>
                <Stack spacing={1} sx={{ maxWidth: '600px' }}>
                  <Autocomplete
                    id='brand'
                    freeSolo
                    options={brands}
                    onChange={(_, value) => {
                      if (!value) formik.setFieldValue('brand', '');
                      else formik.setFieldValue('brand', value.id);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        onChange={(e) =>
                          formik.setFieldValue('brand', e.target.value)
                        }
                        label='brand'
                      />
                    )}
                  />
                </Stack>
              </Grid>

              {/* Color */}
              <Grid item xs={12} sm={3} md={3}>
                <Box pb={0.5} pt={1} alignItems='center' display='flex' gap={1}>
                  <CustomTypo variant='h6' fontFamily='KoHo'>
                    Color
                  </CustomTypo>
                </Box>
              </Grid>
              <Grid item xs={12} sm={9} md={9}>
                <Stack sx={{ maxWidth: '600px' }}>
                  <Autocomplete
                    id='color'
                    name='color'
                    options={apiColors}
                    getOptionLabel={(option) => option.label}
                    onChange={(_, value) => {
                      if (!value) formik.setFieldValue('color', '');
                      else formik.setFieldValue('color', value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder='Select upto 2 colors'
                        onChange={formik.handleChange}
                        value={formik.values?.color}
                      />
                    )}
                  />
                </Stack>
              </Grid>
              {/* Condition */}
              <Grid item xs={12} sm={3} md={3}>
                <Box pb={0.5} pt={1} alignItems='center' display='flex' gap={1}>
                  <CustomTypo variant='h6' fontFamily='KoHo'>
                    Condition
                  </CustomTypo>
                </Box>
              </Grid>
              <Grid item xs={12} sm={9} md={9}>
                <Box
                  display='flex'
                  gap={2.25}
                  flexWrap='wrap'
                  alignItems='stretch'
                >
                  <ConditionField
                    label='New with tags (NWT). Unopened packaging. Unused.'
                    title='New'
                    isSelected={formik.values.condition === 'New'}
                    handleClick={changeCondition}
                  />
                  <ConditionField
                    label={'New without tags (NWOT). No signs of wear. Unused.'}
                    title='Like new'
                    isSelected={formik.values.condition === 'Like new'}
                    handleClick={changeCondition}
                  />
                  <ConditionField
                    label={'Gently Used. One / few minor flaws. Functional.'}
                    title='Good'
                    isSelected={formik.values.condition === 'Good'}
                    handleClick={changeCondition}
                  />
                  <ConditionField
                    label={'Used, functional, multiple flaws / defects.'}
                    title='Fair'
                    isSelected={formik.values.condition === 'Fair'}
                    handleClick={changeCondition}
                  />
                  <ConditionField
                    label={'Major flaws, may be damaged, for parts.'}
                    title='Poor'
                    isSelected={formik.values.condition === 'Poor'}
                    handleClick={changeCondition}
                  />
                </Box>
              </Grid>

              {/* Style Tags */}
              <Grid item xs={12} sm={3} md={3}>
                <Box pb={0.5} pt={1}>
                  <CustomTypo variant='h6' fontFamily='KoHo'>
                    Style Tags
                  </CustomTypo>
                </Box>
                <CustomTypo variant='body1' fontFamily='KoHo'>
                  Add or create tags to find your items easily.
                </CustomTypo>
              </Grid>
              <Grid item xs={12} sm={9} md={9}>
                <Box
                  display='flex'
                  gap={3}
                  maxWidth='600px'
                  sx={{ flexWrap: { xs: 'wrap', sm: 'nowrap' } }}
                >
                  <Stack spacing={1}>
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>#</InputAdornment>
                        ),
                      }}
                      id='title-listing'
                      value={formik.values.tag0}
                      name='tag0'
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      fullWidth
                      error={Boolean(formik.touched.tag0 && formik.errors.tag0)}
                    />
                    {formik.touched.tag0 && formik.errors.tag0 && (
                      <FormHelperText error id='helper-tag0-listing'>
                        {formik.errors.tag0}
                      </FormHelperText>
                    )}
                  </Stack>
                  {/* tag1 */}
                  <Stack spacing={1}>
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>#</InputAdornment>
                        ),
                      }}
                      id='title-listing'
                      value={formik.values.tag1}
                      name='tag1'
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      fullWidth
                      error={Boolean(formik.touched.tag1 && formik.errors.tag1)}
                    />
                    {formik.touched.tag1 && formik.errors.tag1 && (
                      <FormHelperText error id='helper-tag1-listing'>
                        {formik.errors.tag1}
                      </FormHelperText>
                    )}
                  </Stack>
                  {/* tag2 */}
                  <Stack spacing={1}>
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>#</InputAdornment>
                        ),
                      }}
                      id='title-listing'
                      value={formik.values.tag2}
                      name='tag2'
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      fullWidth
                      error={Boolean(formik.touched.tag2 && formik.errors.tag2)}
                    />
                    {formik.touched.tag2 && formik.errors.tag2 && (
                      <FormHelperText error id='helper-tag2-listing'>
                        {formik.errors.tag2}
                      </FormHelperText>
                    )}
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </OutlinedBox>
          {/* Price */}
          <OutlinedBox mt={2} display='flex' flexDirection='column' gap={1}>
            <CustomTypo variant='h4' fontFamily='KoHo'>
              Delivery
            </CustomTypo>
            <CustomTypo variant='body1' fontFamily='KoHo'>
              Best and ecomonomical option for sending items across canada. We
              will email you a label and you will ship the item at nearest
              Canada Post Office.
            </CustomTypo>
            <Grid container spacing={3.5} mt={0}>
              <Grid item xs={12}>
                <Box display='flex' gap={2} justifyContent='space-between'>
                  <Box flex='1' display='flex' alignItems='start' gap={2}>
                    <Radio
                      color='primary'
                      checked={formik.values.delivery_type === 'standard'}
                      name='delivery_type'
                      sx={{ padding: 0, mr: 1, mt: 0.25 }}
                      onChange={() =>
                        formik.setFieldValue('delivery_type', 'standard')
                      }
                    />
                    <CustomTypo variant='h6' fontFamily='KoHo'>
                      Standard Shipping
                    </CustomTypo>
                  </Box>
                  {formik.values.delivery_type === 'standard' && (
                    <Box flex='1'>
                      <CustomTypo fontFamily='KoHo' variant='h5' sx={{ mb: 1 }}>
                        Do you want to Offer Shipping Discount?
                      </CustomTypo>
                      <Box
                        display='flex'
                        alignItems='start'
                        gap={4}
                        flexWrap='wrap'
                      >
                        <Select
                          id='demo-simple-select'
                          name='discountMenu'
                          value={formik.values.discountMenu}
                          onChange={formik.handleChange}
                          sx={{ flex: 1 }}
                        >
                          {discount.map((el) => (
                            <MenuItem key={el.value} value={el.value}>
                              {el.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display='flex' gap={2} justifyContent='space-between'>
                  <Box flex='1' display='flex' alignItems='start' gap={2}>
                    <Radio
                      color='primary'
                      checked={formik.values.delivery_type === 'self_delivery'}
                      name='delivery_type'
                      sx={{ padding: 0, mr: 1, mt: 0.25 }}
                      onChange={() =>
                        formik.setFieldValue('delivery_type', 'self_delivery')
                      }
                    />
                    <Box>
                      <CustomTypo variant='h6' fontFamily='KoHo'>
                        Ship on your own
                      </CustomTypo>
                      <CustomTypo variant='body2' fontFamily='KoHo'>
                        You provide your own label and ship the item
                      </CustomTypo>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </OutlinedBox>
          <OutlinedBox mt={2} display='flex' flexDirection='column' gap={2}>
            <CustomTypo variant='h4' fontFamily='KoHo' sx={{ mb: 1 }}>
              Pricing
            </CustomTypo>
            <Stack spacing={0.5}>
              <CustomTypo fontFamily='KoHo' variant='h6'>
                Original Price
              </CustomTypo>
              <OutlinedInput
                id='origPrice-listing'
                value={formik.values.origPrice}
                name='origPrice'
                type='number'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                fullWidth
                error={Boolean(
                  formik.touched.origPrice && formik.errors.origPrice
                )}
                placeholder='Original Price'
                startAdornment={
                  <InputAdornment position='start'>$</InputAdornment>
                }
              />
              {formik.touched.origPrice && formik.errors.origPrice && (
                <FormHelperText error id='helper-origPrice-listing'>
                  {formik.errors.origPrice}
                </FormHelperText>
              )}
            </Stack>
            <Stack spacing={0.5}>
              <CustomTypo fontFamily='KoHo' variant='h6'>
                Offered Price
              </CustomTypo>
              <OutlinedInput
                id='offeredPrice-listing'
                value={formik.values.offeredPrice}
                name='offeredPrice'
                type='number'
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                fullWidth
                error={Boolean(
                  formik.touched.offeredPrice && formik.errors.offeredPrice
                )}
                placeholder='Offered Price'
                startAdornment={
                  <InputAdornment position='start'>$</InputAdornment>
                }
              />
              {formik.touched.offeredPrice && formik.errors.offeredPrice && (
                <FormHelperText error id='helper-offeredPrice-listing'>
                  {formik.errors.offeredPrice}
                </FormHelperText>
              )}
            </Stack>
            <Stack spacing={0.5}>
              <Box display='flex' justifyContent='space-between'>
                <CustomTypo fontFamily='KoHo' variant='body1'>
                  Selling Fee
                </CustomTypo>
                <CustomTypo fontFamily='KoHo' variant='body1'>
                  -${formik.values.sellingFee}
                </CustomTypo>
              </Box>
              <Box display='flex' justifyContent='space-between'>
                <CustomTypo fontFamily='KoHo' variant='body1'>
                  Shipping Fee
                </CustomTypo>
                <CustomTypo fontFamily='KoHo' variant='body1'>
                  -${formik.values.shippingFee}
                </CustomTypo>
              </Box>
              <Box display='flex' justifyContent='space-between'>
                <CustomTypo fontFamily='KoHo' variant='h6'>
                  You Earn
                </CustomTypo>
                <CustomTypo fontFamily='KoHo' variant='h6'>
                  ${formik.values.yourEarnings}
                </CustomTypo>
              </Box>
            </Stack>
            {/* Submit Buttons */}
          </OutlinedBox>
          <Box
            display='flex'
            gap={3}
            justifyContent='end'
            width='100%'
            maxWidth='100%'
            marginLeft='auto'
            mt={4}
          >
            <Button
              variant='contained'
              color='secondary'
              size='large'
              sx={{ flex: 1 }}
              onClick={() => {
                formik.setFieldValue('status', 'draft');
                formik.handleSubmit();
              }}
            >
              Save Draft
            </Button>
            <Button
              variant='contained'
              size='large'
              sx={{ flex: 1.6 }}
              onClick={() => {
                formik.setFieldValue('status', 'public');
                formik.handleSubmit();
              }}
              disabled={submitloading}
            >
              {submitloading ? (
                <CircularProgress color='primary' size={25} />
              ) : (
                'List Item'
              )}
            </Button>
          </Box>
        </form>
      </Container>
      {toCrop && (
        <EasyCrop
          open={openCropDial}
          image={toCrop.img}
          closeDialog={() => setOpenCropDial(false)}
          passCroppedImg={(img) => {
            saveImageInFormik(img);
            setOpenCropDial(false);
          }}
        />
      )}
    </Page>
  );
};

const OutlinedBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '3px',
  padding: '2rem',
}));

const QuanButton = styled(OutlinedBox, {
  shouldForwardProp: (props) => props !== 'selected',
})(({ selected, theme }) => ({
  minWidth: '150px',
  textAlign: 'center',
  color: selected ? '#fff' : '#000',
  padding: '1rem',
  cursor: 'pointer',
  borderColor: `1px solid ${
    selected ? theme.custom.cherryRed : theme.palette.divider
  }`,
  backgroundColor: selected ? theme.custom.cherryRed : 'transparent',
}));

const ImageGrid = styled(Box)(() => ({
  AutoGridMinSize: '16rem',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
  gridGap: '1rem',
  '& > *': {
    borderRadius: '4px',
    height: '300px',
  },
  '& img': {
    objectFit: 'cover',
    objectPosition: 'center',
  },
  '& .default': {
    display: 'flex',
  },
}));

export default CreateListing;
