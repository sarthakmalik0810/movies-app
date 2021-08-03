import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useFetchMoviesQuery } from '../../store/movies-api-slice';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Pagination from '@material-ui/lab/Pagination';

import { searchActions } from '../../store/search';
import MovieCard from '../../components/UI/MovieCard/MovieCard';
import classes from './MoviesListing.module.css';

const useStyles = makeStyles(() => ({
  ul: {
    '& .MuiPaginationItem-root': {
      color: '#fff',
    },
    '& .Mui-selected': {
      backgroundColor: '#3F51B5',
    },
  },
}));

function MoviesListing() {
  const styles = useStyles();
  const searchQuery = useSelector(state => state.search.searchQuery);
  const page = useSelector(state => state.search.pageNumber);
  const dispatch = useDispatch();
  const history = useHistory();
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });
  const [searchState, setSearchState] = useState(searchQuery);
  let results;

  const { data = { Search: [] }, isFetching } = useFetchMoviesQuery({
    searchQuery: searchQuery,
    page: page,
  });

  const onChangeHandler = e => {
    setSearchState(e.target.value);
  };

  const updateSearchQueryHandler = query => {
    dispatch(searchActions.searchMovie(query));
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    if (searchState.trim().length === 0) {
      return;
    }
    updateSearchQueryHandler(searchState.trim());
  };

  const clickHandler = imdbId => {
    history.push(`/detail/${imdbId}`);
  };

  const noResults = () => {
    if (searchQuery.trim().length === 0) {
      return (
        <p style={{ textAlign: 'center', color: 'white' }}>
          Search for a movie
        </p>
      );
    } else if (data.Response === 'False' && !isFetching) {
      return <p style={{ textAlign: 'center', color: 'white' }}>No Results</p>;
    }
  };

  const handlePageChange = (event, value) => {
    dispatch(searchActions.setPageNumber(value));
  };

  results = noResults();

  return (
    <div className={classes.listingContainer}>
      {isMobile && (
        <form onSubmit={onSubmitHandler}>
          <div className={classes.mobileSearchContainer}>
            <input
              className={classes.mobileSearch}
              onChange={onChangeHandler}
              value={searchState}
              type="text"
              placeholder="Search.."
            />
            <button className={classes.mobileSearchButton} type="submit">
              Search
            </button>
          </div>
        </form>
      )}
      {results}
      {isFetching && (
        <p style={{ textAlign: 'center', color: 'aliceblue' }}>Loading...</p>
      )}
      <div className={classes.movieContainer}>
        {data?.Search?.length > 0 &&
          !isFetching &&
          data.Search.map(movie => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              image={movie.Poster}
              onClick={() => {
                clickHandler(movie.imdbID);
              }}
            />
          ))}
      </div>
      {data?.Search?.length > 0 && !isFetching && (
        <Pagination
          onChange={handlePageChange}
          classes={{ ul: styles.ul, selected: styles.selected }}
          count={Math.ceil(data.totalResults / 10)}
          shape="rounded"
          page={page}
        />
      )}
    </div>
  );
}

export default MoviesListing;
