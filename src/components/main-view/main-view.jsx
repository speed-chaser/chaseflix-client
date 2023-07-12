import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Django Unchained",
      image: "https://m.media-amazon.com/images/I/51SEDTMywXL.jpg",
      director: "Quentin Tarantino",
    },
    {
      id: 2,
      title: "Bottle Rocket",
      image: "https://m.media-amazon.com/images/I/519USYGNDzL.jpg",
      director: "Wes Anderson",
    },
    {
      id: 3,
      title: "True Romance",
      image: "https://m.media-amazon.com/images/I/81flHafm-sL._SY445_.jpg",
      director: "Tony Scott",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  } else {
    return (
      <div>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
    );
  }
};

export default MainView;
