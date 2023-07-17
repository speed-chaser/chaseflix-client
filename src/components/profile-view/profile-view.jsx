import React, { useState } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

export const ProfileView = ({ user, movies }) => {
  const favoriteMovieList = movies.filter((m) => {
    return user.FavoriteMovies.includes(m._id);
  });

  return (
    <>
      <Row className="h-100">
        <Col>
          <div>{user.Username}</div>
          <Form method="get" action={`./users/${user.Username}`}>
            <Button variant="primary" type="submit">
              Edit profile
            </Button>
          </Form>
          <br />
          <br />
          <Button variant="danger">Delete profile</Button>
        </Col>
        <hr />
        <div>Favorite Movies</div>
        {favoriteMovieList.map((movie) => (
          <Col className="mb-5" key={favoriteMovieList.id} md={4}>
            <MovieCard movie={movie}></MovieCard>
          </Col>
        ))}
      </Row>
    </>
  );
};
