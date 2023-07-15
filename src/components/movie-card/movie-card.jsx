import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100" onClick={() => onMovieClick(movie)}>
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body className="card-body">
        <Card.Title class="title">{movie.Title}</Card.Title>
        <Card.Text class="subtext">{movie.Description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

/*
    
    
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.Title}
    </div>
  );
};*/

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string,
      Born: PropTypes.date,
      Death: PropTypes.date,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string,
      Born: PropTypes.date,
      Death: PropTypes.date,
    }),
    Featured: PropTypes.string,
    ImagePath: PropTypes.string,
  }).isRequired,
};
