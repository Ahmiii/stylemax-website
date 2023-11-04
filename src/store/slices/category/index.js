import { createSlice } from '@reduxjs/toolkit';
import { getAllCategories } from './extraReducers';
import { toast } from 'react-toastify';

const initialState = {
  fetching: true,
  loading: true,
  categories: null,
};

const catSlice = createSlice({
  name: 'category',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.categories = payload.categories;
      })
      .addCase(getAllCategories.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });
  },
});

export default catSlice;
