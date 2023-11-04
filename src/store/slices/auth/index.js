import { createSlice } from '@reduxjs/toolkit';
import {
  forgetPassword,
  getMe,
  login,
  resetPassword,
  signup,
  updateMe,
  updatePassword,
  logout,
  updateUserName,
  updateProfilePicture,
  getShippingDetails,
} from './extraReducers';
import { toast } from 'react-toastify';

const initialState = {
  authenticating: true,
  user: null,
  loading: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    showNotLoggedInToast: (state, action) => {
      toast.warning('Please sign in to continue');
    },
  },
  extraReducers: {
    [getMe.pending]: (state) => {
      state.authenticating = true;
    },
    [getMe.fulfilled]: (state, { payload }) => {
      state.authenticating = false;
      state.user = payload.user;
      state.isLoggedIn = true;
    },
    [getMe.rejected]: (state) => {
      state.authenticating = false;
    },
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.isLoggedIn = true;
      state.loading = false;
    },
    [login.rejected]: (state) => {
      state.loading = false;
    },
    // [buyerLogin.pending]: (state) => {
    //   state.loading = true;
    // },
    // [buyerLogin.fulfilled]: (state, { payload }) => {
    //   state.user = payload.user;
    //   state.isLoggedIn = true;
    //   state.loading = false;
    // },
    // [buyerLogin.rejected]: (state) => {
    //   state.loading = false;
    // },
    [logout.pending]: (state) => {
      state.loading = true;
    },
    [logout.fulfilled]: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.loading = false;
    },
    [logout.rejected]: (state) => {
      state.loading = false;
    },

    [signup.pending]: (state) => {
      state.loading = true;
    },
    [signup.fulfilled]: (state, { payload }) => {
      state.loading = false;
      // state.user = payload.user;
      // state.isLoggedIn = true;
      // state.user = payload;
    },
    [signup.rejected]: (state) => {
      state.loading = false;
    },

    [updateMe.pending]: (state) => {
      state.loading = true;
    },
    [updateMe.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.loading = false;
    },
    [updateMe.rejected]: (state) => {
      // state.user = payload.user;
      state.loading = false;
    },
    [forgetPassword.pending]: (state) => {
      state.loading = true;
    },
    [forgetPassword.fulfilled]: (state) => {
      state.loading = false;
      toast.success('Forgot Password link sent to your email address');
    },
    [forgetPassword.rejected]: (state) => {
      state.loading = false;
    },
    [resetPassword.pending]: (state) => {
      state.loading = true;
    },
    [resetPassword.fulfilled]: (state, { payload }) => {
      state.token = payload.token;
      state.user = payload.user;
      localStorage.setItem('token', payload.token);
      state.isLoggedIn = true;
      state.loading = false;
      toast.success('Your Password is Updated');
    },
    [resetPassword.rejected]: (state) => {
      state.loading = false;
    },

    [updatePassword.pending]: (state) => {
      state.loading = true;
    },
    [updatePassword.fulfilled]: (state, { payload }) => {
      state.token = payload.token;
      state.user = payload.user;
      localStorage.setItem('token', payload.token);
      state.isLoggedIn = true;
      state.loading = false;
      toast.success('Your Password is Updated');
    },
    [updatePassword.rejected]: (state) => {
      state.loading = false;
    },
    [updateUserName.pending]: (state) => {
      state.loading = true;
    },
    [updateUserName.fulfilled]: (state, { payload }) => {
      state.user = { ...state.user, ...payload.user };
      state.loading = false;
      toast.success('Username is updated successfully');
    },
    [updateUserName.rejected]: (state) => {
      state.loading = false;
    },
    [updateProfilePicture.pending]: (state) => {
      state.loading = true;
    },
    [updateProfilePicture.fulfilled]: (state, { payload }) => {
      state.user = { ...state.user, ...payload.user };
      state.loading = false;
      toast.success('Profile picture is updated successfully');
    },
    [updateProfilePicture.rejected]: (state) => {
      state.loading = false;
    },

    [getShippingDetails.pending]: (state) => {
      state.loading = true;
    },
    [getShippingDetails.fulfilled]: (state, { payload }) => {
      state.user = {
        ...state.user,
        shippingDetails: payload.shippingDetails.filter(
          (el) => el.isDefault
        )[0],
      };
      state.loading = false;
    },
    [getShippingDetails.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default authSlice;
