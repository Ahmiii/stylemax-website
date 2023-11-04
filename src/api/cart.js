import { getSECURE_API, API, getCOOKIE_API } from './index';

const SECURE_API = getSECURE_API();

// API.interceptors.request.use((req) => {
//   req.baseURL = `${req.baseURL}/category`;
//   return req;
// });

export const deleteMyCart = (id) => SECURE_API.delete(`/cart/${id}`);
export const getMyCart = () => SECURE_API.get('/cart');
export const addItemsToCart = (values) =>
  SECURE_API.post('/cart/product', values);
export const remItemFromCart = (values, cartId) =>
  SECURE_API.delete(`/cart/${cartId}/item`, { data: values });
