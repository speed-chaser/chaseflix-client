import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./profile-update.scss";
import Modal from "react-bootstrap/Modal";
import { ProfilePicUpload } from "./ProfilePicUpload"; // Import the ProfilePicUpload component

export const ProfileUpdate = ({ user, token, setUser }) => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Birthday, setBirthday] = useState("");
  const [Bio, setBio] = useState("");
  const [showPicUploadModal, setShowPicUploadModal] = useState(false);
  const [uploadedPicUrl, setUploadedPicUrl] = useState("");

  const handlePicUpload = (url) => {
    setUploadedPicUrl(url);
    setShowPicUploadModal(false); // Close the modal after upload
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();

    console.log("profile-update User:", user);

    const data = {
      Username: Username,
      Password: Password,
      Email: Email,
      Birthday: Birthday,
      Bio: Bio,
      ProfilePic: UploadedPicUrl || user.ProfilePic,
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
          alert("Data updated!", user, data);
          return response.json();
        } else {
          alert("Update failed :(", user);
        }
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", data.token);
        setUser(data);
        window.location.replace("/");
      });
  };

  return (
    <div
      className="text-light"
      style={{ display: "block", position: "initial" }}
    >
      <h3>Update profile</h3>
      <br />
      <Form onSubmit={handleUpdateSubmit}>
        <Form.Group controlId="formUpUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
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
        <Form.Group controlId="formUpBio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={Bio}
            onChange={(e) => setBio(e.target.value)}
            className="text-light"
          />
        </Form.Group>
        <Button onClick={() => setShowPicUploadModal(true)}>
          Upload Profile Picture
        </Button>

        {/* Profile Picture Upload Modal */}
        <Modal
          show={showPicUploadModal}
          onHide={() => setShowPicUploadModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Upload Profile Picture</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ProfilePicUpload token={token} onUpload={handlePicUpload} />
          </Modal.Body>
        </Modal>
        <Button variant="primary" type="submit">
          Save changes
        </Button>
      </Form>
      <Form method="get" action="/">
        <Button variant="primary" type="submit">
          Back
        </Button>
      </Form>
    </div>
  );
};
