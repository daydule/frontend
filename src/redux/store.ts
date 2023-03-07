import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { dayduleApi } from '@/redux/slice';

export const store = configureStore({
  reducer: {
    [dayduleApi.reducerPath]: dayduleApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dayduleApi.middleware),
});

setupListeners(store.dispatch);
