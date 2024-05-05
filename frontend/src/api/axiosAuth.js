import axios from 'axios';
import queryString from 'query-string';
import { jwtDecode } from 'jwt-decode';
import authApi from './authApi';
import { refreshToken } from '@/redux/authSlice';
import { myHistory } from '@/utils/History/history';
import { toast } from 'react-toastify';

const axiosAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosAuth.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

let refreshTokenRequest = null;
export function setupAxios(store) {
  axiosAuth.interceptors.request.use(async (config) => {
    // Handle token here
    let accessToken = store.getState().auth.accessToken;
    const decodedToken = jwtDecode(accessToken);
    let date = new Date();
    if (decodedToken.exp < date.getTime() / 1000) {
      refreshTokenRequest = refreshTokenRequest
        ? refreshTokenRequest
        : authApi.refreshToken(accessToken);
      try {
        console.log('Expired....', refreshTokenRequest);
        const response = await refreshTokenRequest;
        console.log('Response', response);
        accessToken = response.meta.accessToken;
        if (accessToken) toast.info('Refresh token successfully!');
        store.dispatch(refreshToken(accessToken));
        // Reset token request
        refreshTokenRequest = null;
      } catch (error) {
        console.log('Error', error.response);
        refreshTokenRequest = null;
        if (error.status === 401) {
          toast.info('Something went wrong. Please login again in 3 seconds', {
            onClose: () => myHistory.replace('/login'),
            onClick: () => myHistory.replace('/login'),
          });
        }
      }
      refreshTokenRequest = null;
    }

    config.headers.Authorization = `Bearer ${accessToken}`;
    // console.log(accessToken);
    return config;
  });
}

export default axiosAuth;
