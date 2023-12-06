import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import verifiedLogo from "../../img/patch-check-fill.svg";
import "./profile-view.scss";

export const ProfileView = ({
  token,
  user,
  movies,
  setUser,
  showFavoriteButtons,
}) => {
  const { Username: profileUsername } = useParams();
  const [viewedUser, setViewedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateUsername, setUpdateUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Birthday, setBirthday] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);

  //Favorite movie calculator
  const favoriteMovieList = movies.filter((m) => {
    return viewedUser && viewedUser.FavoriteMovies.includes(m._id);
  });

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);
  const handleShowUpdateModal = () => setShowUpdateModal(true);

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

  const handleFollow = () => {
    fetch(
      `https://chaseflix-481df0d77a4b.herokuapp.com/users/${user._id}/follow/${viewedUser._id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          setIsFollowing(true);
          alert("Followed Successfully");
        } else {
          alert("Failed to follow");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleUnfollow = () => {
    fetch(
      `https://chaseflix-481df0d77a4b.herokuapp.com/users/${user._id}/follow/${viewedUser._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          setIsFollowing(false);
          alert("Unfollowed successfully");
        } else {
          alert("Failed to unfollow");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: updateUsername,
      Password: Password,
      Email: Email,
      Birthday: Birthday,
    };

    fetch(
      `https://chaseflix-481df0d77a4b.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (response.ok) {
          alert(
            "Data updated! You will be sent to login with your new information."
          );
          return response.json();
        } else {
          alert("Update failed :(", user, data);
        }
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", data.token);
        setUser(data);
        localStorage.clear();
        setUser(null);
        window.location.reload();
      });
  };

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
          setUser(null);
          window.location.reload();
        } else {
          alert("Update failed :(");
          window.location.reload();
        }
      })
      .catch((e) => {
        alert("something went wrong");
        window.location.reload();
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!viewedUser) {
    return <div>User not found.</div>;
  }

  //Birthday calculator
  const birthdayDate = viewedUser ? new Date(viewedUser.Birthday) : null;
  const options = { month: "long", day: "numeric", timeZone: "UTC" };
  const formattedDate = birthdayDate.toLocaleDateString(undefined, options);

  //Checking if the viewing user is the same as the logged in user
  const isOwnProfile = user && user._id === viewedUser._id;

  return (
    <>
      <Modal
        show={showUpdateModal}
        className="text-light"
        onHide={handleCloseUpdateModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateSubmit}>
            <Form.Group controlId="formUpUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={updateUsername}
                onChange={(e) => setUpdateUsername(e.target.value)}
                required
                minLength="3"
                className="text-light"
              />
            </Form.Group>
            <Form.Group controlId="formUpPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="8"
                className="text-light"
              />
            </Form.Group>
            <Form.Group controlId="formUpEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-light"
              />
            </Form.Group>
            <Form.Group controlId="formUpBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                value={Birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
                className="text-light"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showModal} className="text-light" onHide={handleClose}>
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
          <div className="d-flex align-items-center">
            <div>
              <img
                src={viewedUser.ProfilePic}
                className="profile-pic"
                alt="profile picture"
              />
            </div>
            <br />
            <div className="username-container">
              <h2>{viewedUser && viewedUser.Username}</h2>
              {viewedUser && viewedUser.Verified && (
                <img
                  src={verifiedLogo}
                  className="verified-img"
                  alt="Verified Logo"
                />
              )}
              {/* Follow/Unfollow Button */}
              {!isOwnProfile &&
                (isFollowing ? (
                  <Button variant="secondary" onClick={handleUnfollow}>
                    Unfollow
                  </Button>
                ) : (
                  <Button variant="primary" onClick={handleFollow}>
                    Follow
                  </Button>
                ))}
            </div>
          </div>
          <div className="my-2">
            <p>{viewedUser && viewedUser.Bio}</p>
            <p>Birthday: {viewedUser && formattedDate}</p>
          </div>

          {isOwnProfile && (
            <>
              <Button
                variant="primary"
                className="button-style"
                onClick={handleShowUpdateModal}
              >
                Edit profile
              </Button>
              <br />
              <br />
              <Button
                className="mb-3 button-style"
                variant="danger"
                onClick={handleShow}
              >
                Delete profile
              </Button>
            </>
          )}
        </Col>
        <hr />
        <h2>Favorite Movies</h2>

        {viewedUser &&
          favoriteMovieList.map((movie) => (
            <Col className="mb-5" md={3} key={movie._id}>
              <MovieCard
                movie={movie}
                user={viewedUser}
                token={token}
                setUser={setUser}
                showFavoriteButtons={isOwnProfile}
              ></MovieCard>
            </Col>
          ))}
      </Row>
    </>
  );
};
