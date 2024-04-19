/* eslint-disable no-unused-labels */
import userApi from '@/api/userApi';
import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';

const createAppSlide = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const userSlice = createAppSlide({
  name: 'user',
  initialState: {
    allUsers: [],
    isFetching: false,
    error: false,
  },
  reducers: (create) => ({
    getAllUsers: create.asyncThunk(
      async (params) => {
        const response = await userApi.getAll(params);
        return response.data || response;
      },
      {
        pending: (state) => {
          state.isFetching = true;
        },
        fulfilled: (state, action) => {
          state.isFetching = false;
          state.allUsers = action.payload;
        },
        rejected: (state) => {
          state.allUsers = [];
          state.isFetching = false;
          state.error = true;
        },
      }
    ),
    deleteUser: create.asyncThunk(
      async (params) => {
        const response = await userApi.deleteUser(params);
        return response.data || response;
      },
      {
        pending: (state) => {
          state.isFetching = true;
        },
        fulfilled: (state) => {
          state.isFetching = false;
        },
        rejected: (state) => {
          state.isFetching = false;
          state.error = true;
        },
      }
    ),
  }),
});

export const { getAllUsers, deleteUser } = userSlice.actions;
export default userSlice.reducer;
