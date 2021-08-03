import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import MoviesListing from './pages/MovieListing/MoviesListing';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import Header from './components/UI/Header/Header';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Redirect to="/landing" />
        </Route>
        <Route path="/landing">
          <Landing />
        </Route>
        <Route path="/listing">
          <MoviesListing />
        </Route>
        <Route path="/detail/:movieId">
          <MovieDetail />
        </Route>
      </Switch>
    </>
  );
}

export default App;
