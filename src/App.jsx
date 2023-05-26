import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import ForgetPassword from "./components/ForgetPassword";
import UpdateProfile from "./components/UpdateProfile";
import Dashboard from "./components/Dashboard";
import AuthProvider from "./context/AuthContext";
import RequireAuth from "./context/RequireAuth";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/update-profile" element={<UpdateProfile />} />
              <Route
                path="/"
                element={
                  <RequireAuth>
                    {" "}
                    <Dashboard />{" "}
                  </RequireAuth>
                }
              />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
