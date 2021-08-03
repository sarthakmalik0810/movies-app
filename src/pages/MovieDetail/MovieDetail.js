import React from 'react';
import { useFetchMovieByIdQuery } from '../../store/movies-api-slice';
import { useParams } from 'react-router-dom';
import classes from './MovieDetail.module.css';

const placeholder = '/assets/poster-placeholder.png';

function MovieDetail() {
  let { movieId } = useParams();
  const { data, isFetching } = useFetchMovieByIdQuery(movieId);

  return (
    <>
    {isFetching && <p style={{textAlign: 'center', color: 'aliceblue'}}>Loading...</p>}
      {!isFetching && data.Response === 'True' && (
        <div className={classes.container}>
          <div>
            <h1>{data.Title}</h1>
          </div>
          <div className={classes.detailContainer}>
            {data.Poster !== 'N/A' ? (
              <img src={data.Poster} alt={data.Title} />
            ) : (
              <img src={placeholder} alt={data.Title} />
            )}
            <div className={classes.movieContainer}>
              <p>
                <b>Genre:</b> {data.Genre}
              </p>
              {data.imdbRating !== "N/A" ? (<p>
                <b>iMDB Rating:</b>{' '}
                <span style={{ fontSize: '1.2rem' }}>{data.imdbRating}</span>/10
                <img
                  style={{ width: '1rem' }}
                  src="/assets/star.png"
                  alt="star"
                />
              </p>): <p>
                <b>iMDB Rating:</b>{' '}N/A</p>}
              <div>
                <h3>Plot</h3>
                <p>{data.Plot}</p>
              </div>
              <p>
                <b>Country:</b> {data.Country}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MovieDetail;
