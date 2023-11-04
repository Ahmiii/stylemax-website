import { createAsyncThunk } from '@reduxjs/toolkit';
import * as userApi from '../../../api/users';
import { toast } from 'react-toastify';

export const getMe = createAsyncThunk(
  '/auth/getMe',
  async (_, { rejectWithValue }) => {
    return userApi
      .getMe()
      .then((res) => ({ user: res.data }))
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);

export const updateMe = createAsyncThunk(
  '/auth/updateMe',
  async (newProfile, { rejectWithValue }) => {
    return userApi
      .updateMe(newProfile)
      .then((res) => ({ user: res.data.user }))
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);

export const getShippingDetails = createAsyncThunk(
  '/auth/shippingDetails',
  async (_, { rejectWithValue }) => {
    return userApi
      .getMyShippingDetails()
      .then((res) => {
        return { shippingDetails: res.data };
      })
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);

export const updateProfilePicture = createAsyncThunk(
  '/auth/updateProfilePicture',
  async (profilePic, { rejectWithValue }) => {
    return userApi
      .updateUserProfile(profilePic)
      .then((res) => ({ user: res.data.user }))
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);

export const updateUserName = createAsyncThunk(
  '/auth/updateUserName',
  async (userName, { rejectWithValue }) => {
    return userApi
      .updateUserName(userName)
      .then((res) => ({ user: userName }))
      .catch((err) => {
        toast.success(`Couldn\'t update username, ${err}`);
        return rejectWithValue(err);
      });
  }
);

export const login = createAsyncThunk(
  '/auth/login',
  async (values, { rejectWithValue }) => {
    return userApi
      .logIn(values)
      .then((res) => {
        localStorage.setItem('userData', JSON.stringify(res.data));
        return res;
      })
      .then((res) => ({ user: res.data }))
      .catch((err) => {
        toast.error(err);
        return rejectWithValue(err);
      });
  }
);

export const logout = createAsyncThunk(
  '/auth/logout',
  async (_, { rejectWithValue }) => {
    return userApi
      .logout()
      .then((res) => ({ message: res.message }))
      .catch((err) => {
        toast.error(err);
        return rejectWithValue(err);
      });
  }
);

export const signup = createAsyncThunk(
  '/auth/signup',
  async (values, { rejectWithValue }) => {
    return (
      userApi
        .signup(values)
        // .then((res) => ({ user: res.data ))
        .catch((err) => {
          toast.error(err);
          return rejectWithValue(err);
        })
    );
  }
);

export const forgetPassword = createAsyncThunk(
  '/auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    return userApi
      .forgotPassword(email)
      .then((res) => ({ message: res.data.message }))
      .catch((err) => {
        toast.error(err);
        return rejectWithValue(err);
      });
  }
);
export const resetPassword = createAsyncThunk(
  '/auth/resetPassword',
  async ({ token, values }, { rejectWithValue }) => {
    return userApi
      .resetPassword(token, values)
      .then((res) => ({ token: res.data.token, user: res.data.user }))
      .catch((err) => {
        toast.error(err);
        return rejectWithValue(err);
      });
  }
);
export const updatePassword = createAsyncThunk(
  '/auth/update-password',
  async (values, { rejectWithValue }) => {
    return userApi
      .updateMePassword(values)
      .then((res) => ({ token: res.data.token, user: res.data.user }))
      .catch((err) => {
        toast.error(err);
        return rejectWithValue(err);
      });
  }
);
