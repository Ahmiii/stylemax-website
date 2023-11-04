import { createAsyncThunk } from '@reduxjs/toolkit';
import * as prodApi from '../../../api/products';
import { toast } from 'react-toastify';

export const newProduct = createAsyncThunk(
  '/product/addNew',
  async (_, { rejectWithValue }) => {
    return prodApi
      .addNewProduct()
      .then((res) => ({ product: res.data.product }))
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);
