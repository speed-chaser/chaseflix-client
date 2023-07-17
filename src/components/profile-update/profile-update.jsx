import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

/*export const ProfileUpdate = ({ user, token, updatedUser }) => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Birthday, setBirthday] = useState("");

  const handleUpdateSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: Username,
      Password: Password,
      Email: Email,
      Birthday: Birthday,
    };

    fetch(
      `https://chaseflix-481df0d77a4b.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Data updated!");
          return response.json();
        }
      })
      .then((user) => {
        // Debugging console logs
        console.log("new user data:", user);
        setTimeout(function () {
          window.location.replace("/");
        }, 2000);

        updatedUser(user);
      })
      .catch((e) => {
        console.error("Error occurred during update: ", error);
        alert("update failed :(");
      });
  };

  return (
    <div style={{ display: "block", position: "initial" }}>
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
          />
        </Form.Group>
        <Form.Group controlId="formUpEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formUpBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            value={Birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>
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
};*/
