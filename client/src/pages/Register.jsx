import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/register", {
        username: user.username,
        password: user.password
      });

      navigate("/login");
    } catch (err) {
      console.log(err);
      setError("Registration failed. Please try a different username.");
    }
  };

  return (
    <div className="container-fluid">
      <h1 className="app-title twinkle-star-regular">Lectora</h1>
      <h2 className="inclusive-sans-bold app-subtitle">Book Tracker</h2>

      <div className="d-flex justify-content-end">
        <Link to="/login" className="btn btn-outline-secondary fw-bold my-2">
          Login
        </Link>
      </div>

      <div className="container d-flex justify-content-center align-items-center mt-5">
        <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
          <h3 className="text-center mb-4">Create Account</h3>

          {error && (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="text-start">
            <div className="mb-4">
              <label htmlFor="username" className="form-label">
                Username
              </label>

              <input
                type="text"
                className="form-control border border-secondary border-opacity-50 rounded-3"
                id="username"
                name="username"
                placeholder="Choose a username"
                value={user.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                Password
              </label>

              <input
                type="password"
                className="form-control border border-secondary border-opacity-50 rounded-3"
                id="password"
                name="password"
                placeholder="Create a password"
                value={user.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>

              <input
                type="password"
                className="form-control border border-secondary border-opacity-50 rounded-3"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={user.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-secondary w-100 fw-bold">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;