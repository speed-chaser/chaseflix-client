import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { ProfileUpdate } from "../profile-update/profile-update";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import verifiedLogo from "../../img/patch-check-fill.svg";
import "./profile-view.scss";

export const ProfileView = ({ token, user, movies, setUser }) => {
  const { Username: profileUsername } = useParams();
  const [viewedUser, setViewedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    if (!profileUsername) return;
    fetch(
      `https://chaseflix-481df0d77a4b.herokuapp.com/users/${profileUsername}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("User not found");
      })
      .then((userData) => {
        setViewedUser(userData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setLoading(false);
      });
  }, [profileUsername, token]);

  const handleShowUpdateModal = () => setShowUpdateModal(true);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!viewedUser) {
    return <div>User not found.</div>;
  }

  const birthdayDate = new Date(viewedUser.Birthday);
  const formattedBirthday = birthdayDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const favoriteMovieList = movies.filter((movie) =>
    viewedUser.FavoriteMovies.includes(movie._id)
  );

  const isOwnProfile = user && user._id === viewedUser._id;

  return (
    <>
      <Row className="h-100 text-light">
        <Col>
          <div className="d-flex align-items-center">
            <img
              src={viewedUser.ProfilePic}
              className="profile-pic"
              alt="Profile"
            />
            <div className="username-container">
              <h2>{viewedUser.Username}</h2>
              {viewedUser.Verified && (
                <img
                  src={verifiedLogo}
                  className="verified-img"
                  alt="Verified Logo"
                />
              )}
            </div>
          </div>
          <div className="my-2">
            <p>{viewedUser.Bio}</p>
            <p>Birthday: {formattedBirthday}</p>
          </div>
          {isOwnProfile && (
            <>
              <Button variant="primary" onClick={handleShowUpdateModal}>
                Edit Profile
              </Button>
              {/* Insert any additional buttons for own profile here */}
            </>
          )}
        </Col>
      </Row>
      <Row>
        <h2>Favorite Movies</h2>
        {favoriteMovieList.map((movie) => (
          <Col className="mb-5" md={3} key={movie._id}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>

      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProfileUpdate user={viewedUser} token={token} setUser={setUser} />
        </Modal.Body>
      </Modal>
    </>
  );
};
