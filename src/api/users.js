import { getSECURE_API, getCOOKIE_API, remoteUrl, getAPI } from './index';

const SECURE_API = getSECURE_API();

export const getMe = () => SECURE_API.get('/user');
export const updateMe = (newProfile) => SECURE_API.patch('/me', newProfile);

export function getAccessToken() {
  let token = localStorage.getItem('access_token');
  if (!token) {
    let userData = localStorage.getItem('userData');
    if (userData) {
      token = JSON.parse(userData)?.access_token;
    }
  }
  return token;
}
const COOKIES_API = getCOOKIE_API();
export const COOKIES_API_PARAMS = getCOOKIE_API();

COOKIES_API.interceptors.request.use((req) => {
  let token = getAccessToken();
  if (token) {
    //append token to url
    req.url = `${req.url}?access_token=${token}`;
  }
  return req;
});

COOKIES_API_PARAMS.interceptors.request.use((req) => {
  let token = getAccessToken();
  if (token) {
    //append token to url
    req.url = `${req.url}&access_token=${token}`;
  }
  return req;
});

const API = getAPI();

export const logout = () => COOKIES_API.post('/user/logout');
export const logIn = (values) => API.post('/user/login', values);
export const updateUser = (payload) => COOKIES_API.patch('/user/', payload);
export const updateUserProfile = (payload) =>
  COOKIES_API.post('/user/picture', payload);

export const getMyShippingDetails = () => COOKIES_API.get('/order/shipping');

export const getMySales = () => COOKIES_API.get('/order/sales');
export const getMySalesbyStatus = (status) =>
  COOKIES_API_PARAMS.get(`/order/sales?status=${status}`);
export const getMyInventoryReport = () => COOKIES_API.get('/product/vendor');
export const getMyInventoryReportCSV = () =>
  COOKIES_API_PARAMS.get('/product/vendor?limit=9999');

export const signup = (values) => COOKIES_API.post('/user/signUp', values);
// export const buyerLogin = () => COOKIES_API.post('/buyer/login', {});

export const forgotPassword = (email) =>
  API.post('/auth/forgotPassword', email);

export const resetPassword = (token, values) =>
  API.patch(`/auth/resetPassword/${token}`, { ...values });

export const updateMePassword = (values) =>
  getSECURE_API().patch(`/auth/update-password`, { ...values });

export const updateUserName = (payload) => COOKIES_API.patch('/user/', payload);
export const updateUserEmail = (email) =>
  COOKIES_API.patch('/user/update-email', email);
