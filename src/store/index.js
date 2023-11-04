import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/auth';
import prodSlice from './slices/product';
import catSlice from './slices/category';
import brandSlice from './slices/brand';
import favSlice from './slices/favourite';
import cartSlice from './slices/cart';

const store = configureStore({
  reducer: combineReducers({
    auth: authSlice.reducer,
    product: prodSlice.reducer,
    category: catSlice.reducer,
    brand: brandSlice.reducer,
    favorite: favSlice.reducer,
    cart: cartSlice.reducer,
  }),
});

export default store;
