import { createAsyncThunk } from '@reduxjs/toolkit';
import * as catApi from '../../../api/categories';
import { toast } from 'react-toastify';

export const getAllCategories = createAsyncThunk(
  '/category/getAll',
  async (_, { rejectWithValue }) => {
    return catApi
      .getCategories()
      .then((res) => ({ categories: res.data }))
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);
