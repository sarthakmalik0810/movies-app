import classes from './MovieCard.module.css';

const placeholder = '/assets/poster-placeholder.png';

function MovieCard({title, description, image, onClick}) {
  return (
    <div onClick={onClick} className={classes.movie}>
      {image === "N/A" ? <img src={placeholder} alt={title} /> : <img src={image} alt={title} />}
      <div className={classes.movieInfo}>
        {title}
      </div>
    </div>
  )
}

export default MovieCard
