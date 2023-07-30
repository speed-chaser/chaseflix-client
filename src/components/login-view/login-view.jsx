import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

import "./login-view.scss";

export const LoginView = ({ onLoggedIn }) => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: Username,
      Password: Password,
    };

    fetch("https://chaseflix-481df0d77a4b.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
          window.location.replace("/movies");
        } else {
          alert("No such user");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert(
          "An error occurred during login. Please check your credentials and try again."
        );
      });
  };

  return (
    <Form className="text-light my-5" onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          size="lg"
          className="text-light mb-3"
          type="text"
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password </Form.Label>
        <Form.Control
          size="lg"
          className="text-light mb-3"
          type="password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button className="me-2 my-2" variant="primary" type="submit">
        Submit
      </Button>
      <div className="mx-4 my-4">
        <h4>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </h4>
      </div>
    </Form>
  );
};
