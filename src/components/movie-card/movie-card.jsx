import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./movie-card.scss";
import starFillImage from "../../img/star-fill.svg";
import starImage from "../../img/star.svg";

export const MovieCard = ({
  movie,
  user,
  token,
  setUser,
  showFavoriteButtons,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(
      user && user.FavoriteMovies && user.FavoriteMovies.includes(movie._id)
    );
  }, [user, movie._id]);

  const addFavoriteMovie = () => {
    if (isFavorite) {
      return;
    }
    fetch(
      `https://chaseflix-481df0d77a4b.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert(`${movie.Title} has been added to your favorites!`);
          return response.json();
        } else {
          alert("Favorites was not updated.");
          return;
        }
      })
      .then((data) => {
        if (user) {
          setIsFavorite(true);
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
      `https://chaseflix-481df0d77a4b.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert(`${movie.Title} was removed from your favorites.`);
          return response.json();
        } else {
          alert("Favorites was not updated.");
          return false;
        }
      })
      .then((data) => {
        if (user) {
          setIsFavorite(false);
          localStorage.setItem("user", JSON.stringify(data));
          setUser(data);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <div className="movie-card text-light">
      {showFavoriteButtons &&
        (isFavorite ? (
          <button className="unfavorite-button" onClick={removeFavoriteMovie}>
            <img src={starFillImage} alt="Unfavorite Button" />
          </button>
        ) : (
          <button className="favorite-button" onClick={addFavoriteMovie}>
            <img src={starImage} alt="Favorite Button" />
          </button>
        ))}
      <Link className="no-und" to={`/movies/${encodeURIComponent(movie._id)}`}>
        <img className="movie-img" src={movie.ImagePath} />
        <div className="card-body">
          <div className="title">{movie.Title}</div>
        </div>
      </Link>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string,
    }),
    Featured: PropTypes.string,
    ImagePath: PropTypes.string,
  }).isRequired,
};
