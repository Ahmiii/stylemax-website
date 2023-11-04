import { getSECURE_API, API, getCOOKIE_API, AUTH_API } from './index';
import { COOKIES_API_PARAMS } from './users';

const SECURE_API = getSECURE_API();
const COOKIE_API = AUTH_API();

export const getSingleProduct = (productId) =>
  SECURE_API.get(`/product/${productId}`);
export const getMyOrders = (status) =>
  COOKIES_API_PARAMS.get(`/order?status=${status}`);
export const getMyEarning = () => SECURE_API.get(`/order/earning`);
export const getMyEarningByDuration = (duration) =>
  COOKIES_API_PARAMS.get(`/order/earning?duration=${duration}`);
 export const processOrder = (cartId) => SECURE_API.post('/order', cartId);
//  export const processOrder = (cartId) => SECURE_API.post('/order', cartId);

export const saveShippingDetails = (values) =>
  SECURE_API.post('/order/shipping', values);
export const getOrderById = (orderId) => SECURE_API.get(`/order/${orderId}`);


export const setOrderStatus = (id, newStatus) => {
  return SECURE_API.post('/order/set-order-status', { id, newStatus });
};