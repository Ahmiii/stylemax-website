import { createSlice } from '@reduxjs/toolkit';
import { getMyFav, addProdToFav, remProdToFav } from './extraReducers';
import { toast } from 'react-toastify';

const initialState = {
  fetching: true,
  loading: false,
  favorites: null,
};

const favSlice = createSlice({
  name: 'favorites',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getMyFav.pending, (state) => {
        state.fetching = true;
      })
      .addCase(getMyFav.fulfilled, (state, { payload }) => {
        state.fetching = false;
        state.favorites = payload.favorites;
      })
      .addCase(getMyFav.rejected, (state, { payload }) => {
        state.fetching = false;
        toast.error(payload);
      });
    builder
      .addCase(addProdToFav.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProdToFav.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.favorites =
          state.favorites && state.favorites.length === 0
            ? [payload.product]
            : [...state.favorites, { ...payload.product }];
      })
      .addCase(addProdToFav.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });
    builder
      .addCase(remProdToFav.pending, (state) => {
        state.loading = true;
      })
      .addCase(remProdToFav.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.favorites = state.favorites.filter(
          (el) => el.product.id !== payload.product.id
        );
      })
      .addCase(remProdToFav.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });
  },
});

export default favSlice;
