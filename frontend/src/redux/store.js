import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REGISTER,
  REHYDRATE,
  PERSIST,
  PURGE,
  PAUSE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authSlice from './authSlice';
import userSlice from './userSlice';

const rootReducers = combineReducers({
  auth: authSlice,
  user: userSlice,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REGISTER, REHYDRATE, PERSIST, PURGE, PAUSE],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
