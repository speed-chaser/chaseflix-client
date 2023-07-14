import React from "react";

export const MovieView = ({ movie, onBackClick, movies }) => {
  const similarMovies = movies.filter(
    (m) => m.Genre === movie.Genre && m.Title !== movie.Title
  );

  return (
    <div>
      <div>
        <img src={movie.ImagePath} alt="Poster of Movie" />
      </div>
      <div>
        <h1>{movie.Title}</h1>
      </div>
      <div>
        <h3>{movie.Description}</h3>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director}</span>
      </div>
      <div>
        <span>Featured: </span>
        <span>{movie.Featured}</span>
      </div>
      <div>
        <hr />
        <h2>Similar Movies</h2>
        {similarMovies.map((similarMovie) => (
          <div key={similarMovie.Title}>{similarMovie.Title}</div>
        ))}
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
