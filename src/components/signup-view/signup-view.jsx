import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import "./signup-view.scss";

export const SignupView = ({ user }) => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Birthday, setBirthday] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Password === controlPassword) {
      const data = {
        Username: Username,
        Password: Password,
        Email: Email,
        Birthday: Birthday,
      };

      setUsername("");
      setPassword("");
      setControlPassword("");
      setEmail("");
      setBirthday("");

      fetch("https://chaseflix-481df0d77a4b.herokuapp.com/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            alert("Signup successful!");
            window.location.replace("/login");
          } else {
            alert("Signup failed :(");
          }
        })
        .catch((error) => {
          console.error("Error during signup:", error);
        });
    } else {
      alert("Your passwords don't match.");
      return;
    }
  };

  return (
    <div>
      <Form className="text-light mb-5" onSubmit={handleSubmit}>
        <Form.Group controlId="formSignUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            size="lg"
            className="text-light mb-3"
            type="text"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
            maxLength="12"
          />
        </Form.Group>
        <Form.Group controlId="formSignPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            size="lg"
            className="text-light mb-3"
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="8"
            maxLength="20"
          />
        </Form.Group>
        <Form.Group controlId="formControlPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            size="lg"
            className="text-light mb-3"
            type="password"
            value={controlPassword}
            onChange={(e) => setControlPassword(e.target.value)}
            required
            minLength="8"
            maxLength="20"
          />
        </Form.Group>
        <Form.Group controlId="formSignEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            size="lg"
            className="text-light mb-3"
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formSignBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            size="lg"
            className="text-light"
            type="date"
            value={Birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" className="me-2 my-4" type="submit">
          Submit
        </Button>
        <div className="mx-4 my-4">
          <h3>
            Already registered? <Link to="/login">Login</Link>
          </h3>
        </div>
      </Form>
      <hr />
      <div>
        <p className=" d-flex justify-content-center">
          Note:
          <br />
          We will not use or distribute your email or any of your data.
          <br />
          We will never ask for your password nor do I have access to it.
        </p>
      </div>
    </div>
  );
};
