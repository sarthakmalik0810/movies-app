import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchQuery: '',
    pageNumber: 1
  },
  reducers: {
    searchMovie(state, action) {
      state.searchQuery = action.payload;
      state.pageNumber = 1
    },
    setPageNumber(state, action) {
      state.pageNumber = action.payload
    }
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice;
