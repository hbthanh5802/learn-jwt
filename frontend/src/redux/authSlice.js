import authApi from '@/api/authApi';
import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';

const createAppSlide = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const authSlice = createAppSlide({
  name: 'auth',
  initialState: {
    currentUser: null,
    accessToken: null,
    isFetching: false,
    error: false,
  },
  reducers: (create) => ({
    login: create.asyncThunk(
      async (params) => {
        const response = await authApi.loginUser(params);
        return response;
      },
      {
        pending: (state) => {
          state.isFetching = true;
        },
        rejected: (state) => {
          state.currentUser = null;
          state.accessToken = null;
          state.isFetching = false;
          state.error = true;
        },
        fulfilled: (state, action) => {
          const { data, meta } = action.payload;
          state.isFetching = false;
          state.currentUser = data;
          state.accessToken = meta.accessToken;
          state.error = false;
        },
      }
    ),
    register: create.asyncThunk(
      async (params) => {
        const response = await authApi.registerUser(params);
        return response;
      },
      {
        pending: (state) => {
          state.isFetching = true;
        },
        rejected: (state) => {
          state.isFetching = false;
          state.error = true;
        },
        fulfilled: (state) => {
          state.isFetching = false;
          state.error = false;
        },
      }
    ),
    logout: create.asyncThunk(
      async (params) => {
        const response = await authApi.logoutUser(params);
        return response;
      },
      {
        pending: (state) => {
          state.isFetching = true;
        },
        rejected: (state) => {
          state.isFetching = false;
          state.error = true;
        },
        fulfilled: (state) => {
          state.isFetching = false;
          state.error = null;
          state.currentUser = null;
          state.accessToken = null;
        },
      }
    ),
    refreshToken: create.reducer((state, action) => {
      state.accessToken = action.payload;
    }),
  }),
});

const { reducer, actions } = authSlice;
export const { login, register, refreshToken, logout } = actions;
export default reducer;
