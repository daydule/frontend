import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { dayduleApi } from '@/redux/slice';

export const store = configureStore({
  reducer: {
    [dayduleApi.reducerPath]: dayduleApi.reducer,
    toastr: toastrReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dayduleApi.middleware),
});

setupListeners(store.dispatch);
