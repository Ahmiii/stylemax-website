import { getSECURE_API, API, getCOOKIE_API } from './index';

const SECURE_API = getSECURE_API();
SECURE_API.interceptors.request.use((req) => {
  req.baseURL = `${req.baseURL}/product`;
  return req;
});

export const addNewProduct = (values) => SECURE_API.post('/', values);
export const getProductByCategory = (catId) =>
  API.get(`/product/category/${catId}`);

export const getProdBySelFilters = (filters) =>
  API.post(`/product/search`, filters);

export const getProdBySelFilterSec = (filters) =>
  SECURE_API.post(`/search`, filters);

// export const getProducts = () => SECURE_API.get('/');
