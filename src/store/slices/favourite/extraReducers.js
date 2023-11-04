import { createAsyncThunk } from '@reduxjs/toolkit';
import * as favApi from '../../../api/favourite';

export const getMyFav = createAsyncThunk(
  '/favourite/getMyFav',
  async (_, { rejectWithValue }) => {
    return favApi
      .getFavorite()
      .then((res) => ({ favorites: res.data }))
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);

export const addProdToFav = createAsyncThunk(
  '/favourite/addMyFav',
  async (selProduct, { rejectWithValue }) => {
    return favApi
      .setFavorite({ product_id: selProduct.id })
      .then((res) => ({ product: { ...res.data, product: selProduct } }))
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);
export const remProdToFav = createAsyncThunk(
  '/favourite/remMyFav',
  async (selProduct, { rejectWithValue }) => {
    return favApi
      .remFavorite({ product_id: selProduct.id })
      .then(() => ({ product: selProduct }))
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);
