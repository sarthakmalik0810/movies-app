import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { searchActions } from '../../../store/search';
import classes from './Header.module.css';

function Header() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const searchQuery = useSelector(state => state.search.searchQuery);
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });
  const [searchState, setSearchState] = useState(searchQuery);

  const onChangeHandler = e => {
    setSearchState(e.target.value);
  };

  useEffect(() => {
    setSearchState(searchQuery);
  }, [searchQuery]);

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
  function navigate(path) {
    history.push(path);
  }
  return (
    <div className={classes.header}>
      <div>
        <h2 onClick={() => navigate('/')}>
          <span>MOVIES</span> APP
        </h2>
      </div>
      {!isMobile && location.pathname === '/listing' && (
        <form onSubmit={onSubmitHandler}>
          <div>
            <input
              type="text"
              className={classes.searchBox}
              value={searchState}
              onChange={onChangeHandler}
              placeholder="Search.."
            />
          </div>
        </form>
      )}
    </div>
  );
}

export default Header;
