import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const MOVIES_API_KEY = '1ab82e79';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://www.omdbapi.com/`,
  }),
  endpoints: builder => ({
    fetchMovies: builder.query({
      query:({searchQuery, page}) => {
        console.log(page);
        console.log(searchQuery)
        return `?apikey=${MOVIES_API_KEY}&s=${searchQuery}&page=${page}`;
      },
    }),
    fetchMovieById: builder.query({
      query:(movieId) => {
        return `?apikey=${MOVIES_API_KEY}&i=${movieId}`;
      },
    }),
  }),
});

export const { useFetchMoviesQuery, useFetchMovieByIdQuery } = apiSlice;
