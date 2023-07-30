import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./movie-view.scss";
import Button from "react-bootstrap/Button";

export const MovieView = ({
  movies,
  user,
  token,
  setUser,
  setFilteredMovies,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const foundMovie = movies.find((m) => m._id === id);
    setMovie(foundMovie);
    setIsFavorite(
      user && user.FavoriteMovies && user.FavoriteMovies.includes(id)
    );
  }, [id, movies, user]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const handleGoBack = () => {
    navigate(-1);
    setFilteredMovies(movies);
  };

  const addFavoriteMovie = () => {
    if (isFavorite) {
      return;
    }
    fetch(
      `https://chaseflix-481df0d77a4b.herokuapp.com/users/${user.Username}/movies/${id}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert(`${movie.Title} has been added to your favorites!`);
          setIsFavorite(true);
          return response.json();
        } else {
          alert("Favorites was not updated.");
          return;
        }
      })
      .then((data) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(data));
          setUser(data);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  const removeFavoriteMovie = () => {
    if (!isFavorite) {
      return;
    }
    fetch(
      `https://chaseflix-481df0d77a4b.herokuapp.com/users/${user.Username}/movies/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert(`${movie.Title} was removed from your favorites.`);
          setIsFavorite(false);
          return response.json();
        } else {
          alert("Favorites was not updated.");
          return false;
        }
      })
      .then((data) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(data));
          setUser(data);
        }
      })
      .catch((e) => {
        alert(e);
      });
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
        <h4>{movie.Description}</h4>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div className="my-2">
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        {isFavorite ? (
          <Button
            variant="warning"
            className="my-md-auto"
            onClick={removeFavoriteMovie}
          >
            Remove from Favorites
          </Button>
        ) : (
          <Button
            variant="secondary"
            className="my-md-auto"
            onClick={addFavoriteMovie}
          >
            Add to Favorites
          </Button>
        )}
        <Button
          onClick={handleGoBack}
          className="my-md-auto mx-md-2"
          variant="secondary"
        >
          Return
        </Button>
      </div>
    </div>
  );
};
