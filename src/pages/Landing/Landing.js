import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classes from './Landing.module.css';
import { searchActions } from '../../store/search';

const moviesBanner = '/assets/movies.svg';

function Landing() {
  const history = useHistory();
  const dispatch = useDispatch();
  const inputRef = useRef();
  function searchHandler(e) {
    e.preventDefault();
    let searchTerm = inputRef.current.value;
    if (searchTerm.trim().length === 0) {
      return;
    }
    dispatch(searchActions.searchMovie(searchTerm.trim()));
    history.push('/listing');
  }

  return (
    <>
      <form>
        <div className={classes.container}>
          <h1 className={classes.title}>SEARCH FOR A MOVIE</h1>
          <input type="text" name="movies" ref={inputRef} />
          <button
            type="submit"
            className={classes.button}
            onClick={searchHandler}
          >
            <h2>SEARCH</h2>
          </button>
          <img src={moviesBanner} alt="landing" className={classes.banner} />
        </div>
      </form>
    </>
  );
}

export default Landing;
