import React, { useState } from "react";
import { Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logOut } = useAuth();
  const [error, setError] = useState("");
  const handelLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      setError("Failed to log out");
    }
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong>
          {currentUser && currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        <Button className="btn btn-primary mt-4" onClick={handelLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
};

export default Dashboard;
