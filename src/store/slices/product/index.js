import { createSlice } from '@reduxjs/toolkit';
import { newProduct } from './extraReducers';
import { toast } from 'react-toastify';

const initialState = {
  fetching: true,
  loading: true,
  products: null,
};

const prodSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(newProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(newProduct.fulfilled, (state, { products }) => {
        state.loading = false;
        state.products = products;
      })
      .addCase(newProduct.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });
  },
});

export default prodSlice;
