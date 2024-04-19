import { axiosClient } from './axiosClient';

const userApi = {};

userApi.getAll = (token) => {
  const url = '/user';
  return axiosClient.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default userApi;
