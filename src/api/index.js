import axios from 'axios';

let baseURL = '';

//const localUrl = 'http://localhost:3000';
//export const remoteUrl = 'https://api.stylemax.ca';
//export const remoteUrl = 'http://143.198.38.244:4001/';

export const remoteUrl = 'http://localhost:3003';

// if (process.env.NODE_ENV === 'development') baseURL = localUrl;
// else baseURL = remoteUrl;

baseURL = remoteUrl;

function getAccessToken() {
  let token = localStorage.getItem('access_token');
  if (!token) {
    let userData = localStorage.getItem('userData');
    if (userData) token = JSON.parse(userData)?.access_token;
  }
  return token;
}

const responseCallback = (res) => {
  if (res.status === 200) return res;
  return Promise.reject(
    res.response?.data || res.message || 'Something Went Wrong'
  );
};

export const getSECURE_API = () => {
  const SECURE_API = axios.create({ baseURL });
  SECURE_API.interceptors.response.use((req) => req, responseCallback);
  SECURE_API.interceptors.request.use((req) => {
    req.baseURL = `${req.baseURL}/`;
    let token = getAccessToken();
    if (token) req.url = `${req.url}?access_token=${token}`;
    return req;
  });
  return SECURE_API;
};

export const AUTH_API = () => {
  const SECURE_API = axios.create({ baseURL });
  SECURE_API.interceptors.response.use((req) => req, responseCallback);
  SECURE_API.interceptors.request.use((req) => {
    req.baseURL = `${req.baseURL}/`;
    let token = getAccessToken();
    if (token) req.url = `${req.url} `;
    return req;
  });
  return SECURE_API;
};

export const getAPI = () => {
  const API = axios.create({ baseURL });
  API.interceptors.response.use((req) => req, responseCallback);
  return API;
};

export const API = axios.create({ baseURL });
API.interceptors.response.use((req) => req, responseCallback);

export const getCOOKIE_API = () => {
  const COOKIE_API = axios.create({ baseURL });
  COOKIE_API.interceptors.response.use((req) => req, responseCallback);

  return COOKIE_API;
};
