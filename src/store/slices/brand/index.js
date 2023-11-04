import { createSlice } from '@reduxjs/toolkit';
import { getAllBrands } from './extraReducers';
import { toast } from 'react-toastify';

const initialState = {
  fetching: true,
  loading: true,
  brands: null,
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllBrands.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBrands.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.brands = payload.brands;
      })
      .addCase(getAllBrands.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });
  },
});

export default brandSlice;
