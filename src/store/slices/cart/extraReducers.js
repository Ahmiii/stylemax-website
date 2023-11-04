import { createAsyncThunk } from '@reduxjs/toolkit';
import * as cartApi from '../../../api/cart';
import { toast } from 'react-toastify';

export const getCart = createAsyncThunk(
  '/cart/getCart',
  async (_, { rejectWithValue }) => {
    return cartApi
      .getMyCart()
      .then((res) => ({ cart: res.data }))
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);

export const addItemsToCart = createAsyncThunk(
  '/cart/addToCart',
  async (values, { rejectWithValue }) => {
    return cartApi
      .addItemsToCart(values)
      .then((res) => ({ cart: { product: values, id: res.data } }))
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);

export const remFromCart = createAsyncThunk(
  '/cart/removeFromCart',
  async (values, { rejectWithValue }) => {
    return cartApi
      .remItemFromCart(values.bodyVal, values.cartId)
      .then(() => ({ product: values.bodyVal, id: values.cartId }))
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);
