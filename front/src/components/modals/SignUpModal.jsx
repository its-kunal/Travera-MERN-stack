import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import serverInstance from "../../axios/serverInstance";

export default function SignUpModal({ show, handleClose, hitNextModal }) {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [name, setName] = useState(null);
  const [signUpVerfiyModal, setSignUpVerfiyModal] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message != "") {
      setTimeout(() => {
        setMessage("");
      }, 4000);
    }
  }, [message]);

  const nextHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      await serverInstance
        .get("/auth/signup", { params: { username, email, password, name } })
        .then((v) => {
          console.log(v);
        });
      hitNextModal();
      handleClose();
    } catch (err) {
      setMessage(err.response.data);
      return;
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Travera, Sign Up</Modal.Title>
        </Modal.Header>
        <Form onSubmit={nextHandler}>
          <Modal.Body>
            {message !== "" ? (
              <Alert variant="danger">
                <Alert.Heading>Error</Alert.Heading>
                <p>{message}</p>
              </Alert>
            ) : null}

            {/* Name  */}
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Enter Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                required
                onChange={(e) => {
                  setName(e.currentTarget.value);
                }}
              />
            </Form.Group>

            {/* Select Username */}
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Enter Username</Form.Label>
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

            {/* Email */}
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Enter Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                autoComplete="email"
                name="email"
                value={email}
                required
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            {/* Password */}
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
                Craft a password that unlocks your travel dreams.
              </Form.Text>
            </Form.Group>

            {/* Confirm Password */}
            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                className={`${
                  password == confirmPassword ? "text-success" : "text-danger"
                }`}
                type="password"
                placeholder="Confirm Password"
                name="confirmpassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.currentTarget.value);
                }}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="info" type="submit">
              Next
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
