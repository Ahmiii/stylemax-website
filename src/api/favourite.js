import { getSECURE_API, API, getCOOKIE_API } from './index';

const SECURE_API = getSECURE_API();

export const getFavorite = () => SECURE_API.get('/like');
export const getLikes = () => SECURE_API.get('/like');
export const setFavorite = (prodId) => SECURE_API.post('/like', prodId);
export const remFavorite = (prodId) =>
  SECURE_API.delete('/like', { data: { ...prodId } });
