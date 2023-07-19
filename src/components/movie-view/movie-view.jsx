import React from "react";
import "./movie-view.scss";
import Button from "react-bootstrap/Button";

export const MovieView = ({ movie, onBackClick, movies }) => {
  const similarMovies = movies.filter(
    (m) => m.Genre === movie.Genre && m.Title !== movie.Title
  );

  return (
    <div>
      <div>
        <img src={movie.ImageBackdrop} alt="Poster of Movie" />
      </div>
      <div className="title">
        <h1>{movie.Title}</h1>
      </div>
      <div className="subtext">
        <h3>{movie.Description}</h3>
      </div>
      <div className="subtext">
        <span>Genre: </span>
        <span>{movie.Genre}</span>
      </div>
      <div className="subtext">
        <span>Director: </span>
        <span>{movie.Director}</span>
      </div>
      <div className="subtext">
        <span>Featured: </span>
        <span>{movie.Featured}</span>
      </div>
      <div className="subtext">
        <hr />
        <h2>Similar Movies</h2>
        {similarMovies.map((similarMovie) => (
          <div key={similarMovie.Title}>{similarMovie.Title}</div>
        ))}
      </div>
      <Button onClick={onBackClick}>Back</Button>
    </div>
  );
};
