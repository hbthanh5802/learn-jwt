import authApi from '@/api/authApi';
import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';

const createAppSlide = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const authSlice = createAppSlide({
  name: 'auth',
  initialState: {
    currentUser: null,
    isFetching: false,
    message: null,
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
          state.message = null;
          state.currentUser = null;
        },
        rejected: (state, action) => {
          const { message } = action.error.message;
          state.isFetching = false;
          state.message = message;
        },
        fulfilled: (state, action) => {
          const { data, meta, message } = action.payload;
          state.isFetching = false;
          state.currentUser = { data, meta };
          state.message = message;
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
          state.message = null;
          state.currentUser = null;
        },
        rejected: (state, action) => {
          const { message } = action.error.message;
          state.isFetching = false;
          state.message = message;
        },
        fulfilled: (state, action) => {
          const { message } = action.payload;
          state.isFetching = false;
          state.message = message;
        },
      }
    ),
  }),
});

const { reducer, actions } = authSlice;
export const { login, register } = actions;
export default reducer;
