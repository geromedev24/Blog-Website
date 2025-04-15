import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

export default function Register() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [showAlert, setShowAlert] = useState(null);

  const navigate = useNavigate();

  const handleShowAlert = (message, variant = "success") => {
    setShowAlert({ message, variant });
    setTimeout(() => {
      setShowAlert(null);
    }, 3000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowAlert(null);

    if (!username || !password) {
      handleShowAlert("Please fill in all fields.", "warning");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = response.json();
        handleShowAlert(data.error || "Registration failed.", "danger");
        return;
      }

      handleShowAlert("Registration Successful! Redirecting...");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error(`Failed to register user: ${error.message}`);
      handleShowAlert("Failed to register user.", "danger");
    }
  };

  return (
    <>
      <h1>Register</h1>
      {showAlert && (
        <Alert variant={showAlert.variant}>{showAlert.message}</Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Please enter Username"
            value={username}
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Please enter Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
