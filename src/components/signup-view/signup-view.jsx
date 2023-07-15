import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const SignupView = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: Username,
      Password: Password,
      Email: Email,
      Birthday: Birthday,
    };

    setUsername("");
    setPassword("");
    setEmail("");
    setBirthday("");

    fetch("https://chaseflix-481df0d77a4b.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful!");
        window.location.reload();
      } else {
        alert("Signup failed :(");
      }
    });
  };

  return (
    <Form className="text-light" onSubmit={handleSubmit}>
      <Form.Group controlId="formSignUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          className="text-light"
          type="text"
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
        />
      </Form.Group>
      <Form.Group controlId="formSignPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          className="text-light"
          type="password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="8"
        />
      </Form.Group>
      <Form.Group controlId="formSignEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          className="text-light"
          type="email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formSignBirthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          type="date"
          value={Birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
