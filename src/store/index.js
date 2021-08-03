import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from './movies-api-slice';
import searchSlice from './search';

const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware)
  }
});

export default store;
