import axiosAuth from './axiosAuth';

const userApi = {};

userApi.getAll = ({ token }) => {
  const url = '/user';
  return axiosAuth.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

userApi.deleteUser = ({ token, userId }) => {
  const url = '/user/' + userId;
  return axiosAuth.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default userApi;
