import axiosAuth from './axiosAuth';
import axiosClient from './axiosClient';

const authApi = {};

authApi.loginUser = (data) => {
  const url = '/auth/login';
  return axiosClient.post(url, data, {
    withCredentials: true,
  });
};

authApi.registerUser = (data) => {
  const url = '/auth/register';
  return axiosClient.post(url, data);
};

authApi.refreshToken = () => {
  console.log('Refresh........');
  const url = '/auth/refresh';
  return axiosClient.post(
    url,
    {},
    {
      withCredentials: true,
    }
  );
};

authApi.logoutUser = () => {
  const url = '/auth/logout';
  return axiosAuth.post(
    url,
    {},
    {
      withCredentials: true,
    }
  );
};

export default authApi;
