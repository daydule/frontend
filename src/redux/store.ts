import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { dayduleApi } from '@/redux/slice';
import { reducer as toastrReducer, ToastrState } from 'react-redux-toastr';

export const store = configureStore({
  reducer: {
    [dayduleApi.reducerPath]: dayduleApi.reducer,
    toastr: toastrReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dayduleApi.middleware),
});

setupListeners(store.dispatch);
