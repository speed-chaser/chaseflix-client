import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export const ProfileView = ({ token, user, movies, setUser }) => {
  const favoriteMovieList = movies.filter((m) => {
    return user.FavoriteMovies.includes(m._id);
  });
  const birthdayDate = new Date(user.Birthday);
  const options = { month: "long", day: "numeric", timeZone: "UTC" };
  const formattedDate = birthdayDate.toLocaleDateString(undefined, options);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { username } = useParams();

  useEffect(() => {
    fetch(
      `https://chaseflix-481df0d77a4b.herokuapp.com/users/${user.Username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("User not found");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [username, token, setUser]);

  const handleDeleteSubmit = (event) => {
    event.preventDefault();

    fetch(
      `https://chaseflix-481df0d77a4b.herokuapp.com/users/${user.Username}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("User Deleted");
          localStorage.clear();
          window.location.reload();
        } else {
          alert("Update failed :(");
          window.location.reload();
        }
      })
      .catch((e) => {
        alert("something went wreong");
        window.location.reload();
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Delete account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleDeleteSubmit}>
            <p>
              Are you sure you want to delete your account, {user.Username}?
            </p>
            <Button variant="danger" type="submit">
              Delete my account
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Row className="h-100 text-light">
        <Col>
          <div>{user.Username}</div>
          <div>Birthday: {formattedDate}</div>
          <Form method="get" action={`./update`}>
            <Button variant="primary" type="submit">
              Edit profile
            </Button>
          </Form>
          <br />
          <br />
          <Button className="mb-3" variant="danger" onClick={handleShow}>
            Delete profile
          </Button>
        </Col>
        <hr />
        <h2>Favorite Movies</h2>

        {favoriteMovieList.map((movie) => (
          <Col className="mb-5" md={3} key={favoriteMovieList.id}>
            <MovieCard
              movie={movie}
              user={user}
              token={token}
              setUser={setUser}
            ></MovieCard>
          </Col>
        ))}
      </Row>
    </>
  );
};
