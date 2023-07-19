import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./movie-view.scss";
import Button from "react-bootstrap/Button";

export const MovieView = ({ movies }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("id:", id);
  console.log("movies: ", movies);

  const movie = movies.find((m) => m._id === id);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="text-light">
      <div>
        <img loading="lazy" src={movie.ImageBackdrop} alt="Poster of Movie" />
      </div>
      <div>
        <h1>{movie.Title}</h1>
      </div>
      <div>
        <h3>{movie.Description}</h3>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span>Featured: </span>
        <span>{movie.Featured}</span>
      </div>
      <div>
        <hr />
        <Button onClick={handleGoBack} variant="secondary">
          Return
        </Button>
      </div>
    </div>
  );
};
