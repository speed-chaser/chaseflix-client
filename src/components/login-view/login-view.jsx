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
    console.log("onLoggedIn", onLoggedIn);

    fetch("https://chaseflix-481df0d77a4b.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
          window.location.replace("/");
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
    <Form className="light-text" onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="text-light"
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password </Form.Label>
        <Form.Control
          type="password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="text-light"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <div>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </Form>
  );
};
