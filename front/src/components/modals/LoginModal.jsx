import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import serverInstance from "../../axios/serverInstance";

export default function SignUpModal({ show, handleClose }) {
  // States
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message != "") {
      setTimeout(() => {
        setMessage("");
      }, 4000);
    }
  }, [message]);

  const submitHandler = (e) => {
    let isEmail = false;
    e.preventDefault();
    if (String(username).includes("@")) {
      isEmail = true;
    }
    try {
      if (!isEmail) {
        serverInstance.post("/auth/login", { username, password });
      } else {
        serverInstance.post("/auth/login", { email, password });
      }
    } catch (err) {
      setMessage(err.response.data);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Travera, Log In</Modal.Title>
      </Modal.Header>
      {/* TODO: Add Form Submit handler */}
      <Form onSubmit={submitHandler}>
        <Modal.Body>
          {message !== "" ? (
            <Alert variant="danger">
              <Alert.Heading>Error</Alert.Heading>
              <p>{message}</p>
            </Alert>
          ) : null}

          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Enter Username or Email</Form.Label>
            <Form.Control
              autoComplete="username"
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              required
              onChange={(e) => {
                setUsername(e.currentTarget.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              autoComplete="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
            />
            <Form.Text className="text-info-emphasis">
              Unlock your travel dreams.
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
