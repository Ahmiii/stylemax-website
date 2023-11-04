import { getSECURE_API, API, getCOOKIE_API } from './index';

// API.interceptors.request.use((req) => {
//   req.baseURL = `${req.baseURL}/category`;
//   return req;
// });

export const getCategories = () => API.get('/category');
// export const getProducts = () => SECURE_API.get('/');
