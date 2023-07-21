import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import serverInstance from "../../axios/serverInstance";
export default function SignUpVerifyModal({ show, handleClose }) {
  const [otp, setOtp] = useState(null);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (message != "") {
      setTimeout(() => {
        setMessage("");
      }, 4000);
    }
  }, [message]);

  const handleSumbit = async () => {
    try {
      await serverInstance.get("/auth/signup/verify", {
        params: { email: email, otp: otp },
      });
    } catch (err) {
      setMessage(err.response.data);
      return;
    } finally {
      handleClose();
    }
  };
  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Form>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Enter Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="otp">
            <Form.Label>Enter Otp (sent to your given mail id)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter OTP"
              name="otp"
              value={otp}
              onChange={(e) => {
                setOtp(e.currentTarget.value);
              }}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Verify Later
          </Button>
          <Button variant="info" onClick={handleSumbit}>
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
