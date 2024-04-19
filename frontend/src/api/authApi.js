import { axiosClient } from './axiosClient';

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

export default authApi;
