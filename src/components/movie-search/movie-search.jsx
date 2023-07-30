import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "./movie-search.scss";
import searchIcon from "../../img/search.svg";

export const MovieSearch = ({ movies, setFilteredMovies }) => {
  const [searchQuery, setSearchQuery] = useState([]);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = movies.filter((movie) =>
      movie.Title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  return (
    <Form className="mb-3 text-light image-and-search-container">
      <img src={searchIcon} alt="search icon" className="search-icon" />
      <Form.Control
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        className="text-light"
      />
    </Form>
  );
};
