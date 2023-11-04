import { createSlice } from '@reduxjs/toolkit';
import { addItemsToCart, getCart, remFromCart } from './extraReducers';
import { toast } from 'react-toastify';

const initialState = {
  fetching: true,
  loading: false,
  cart: null,
  shippingAddress: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.fetching = true;
      })
      .addCase(getCart.fulfilled, (state, { payload }) => {
        state.fetching = false;
        state.cart = payload.cart;
      })
      .addCase(getCart.rejected, (state, { payload }) => {
        state.fetching = false;
        state.cart = null;
        toast.error(payload);
      });
    builder
      .addCase(addItemsToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemsToCart.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cart = !state.cart
          ? { id: payload.cart.id, cartItems: [payload.cart.product] }
          : {
              ...state.cart,
              cartItems: [...state.cart.cartItems, payload.cart.product],
            };
      })
      .addCase(addItemsToCart.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });
    builder
      .addCase(remFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(remFromCart.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cart = {
          ...state.cart,
          cartItems: state.cart.cartItems.filter(
            (el) => el.product.id !== payload.product.product_id
          ),
        };
      })
      .addCase(remFromCart.rejected, (state, { payload }) => {
        state.loading = false;
        toast.error(payload);
      });
  },
});

export default cartSlice;
