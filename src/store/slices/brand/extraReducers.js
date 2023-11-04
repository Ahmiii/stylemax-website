import { createAsyncThunk } from '@reduxjs/toolkit';
import * as branApi from '../../../api/brands';
import { toast } from 'react-toastify';

export const getAllBrands = createAsyncThunk(
  '/brand/getAll',
  async (_, { rejectWithValue }) => {
    return branApi
      .getBrands()
      .then((res) => ({ brands: res.data }))
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);
