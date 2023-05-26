import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (
      passwordRef.current.value === "" ||
      emailRef.current.value === "" ||
      passwordConfirmationRef.current.value === ""
    ) {
      return setError("Enter a valid account");
    }
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Passwords do not match");
    }
    if (passwordRef.current.value.length < 6) {
      return setError("Password should be greater than 6 letters");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value).then(
        () => {
          navigate("/");
        }
      );
    } catch (error) {
      setError("Failed to create an account");
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handelSubmit}>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control type="email" id="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password" className="mt-3">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                id="password"
                ref={passwordRef}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password-confirmation" className="mt-3">
                Password Confirmation
              </Form.Label>
              <Form.Control
                type="password"
                id="password-confirmation"
                ref={passwordConfirmationRef}
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-3"
              disabled={loading}
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        Already have an account ? <Link to="/login">Log In</Link>
      </div>
    </>
  );
};

export default SignUp;
