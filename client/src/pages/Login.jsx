import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/login", credentials);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="container-fluid">
      <h1 className="app-title twinkle-star-regular">Lectora</h1>
      <h2 className="inclusive-sans-bold app-subtitle">Book Tracker</h2>

      <div className="d-flex justify-content-end">
        <Link to="/register" className="btn btn-outline-secondary fw-bold my-2">
          Register
        </Link>
      </div>

      <div className="container d-flex justify-content-center align-items-center mt-5">
        <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
          <h3 className="text-center mb-4">Login</h3>

          {error && (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="text-start">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>

              <input
                type="text"
                className="form-control border border-secondary border-opacity-50 rounded-3"
                id="username"
                name="username"
                placeholder="Enter username"
                value={credentials.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>

              <input
                type="password"
                className="form-control border border-secondary border-opacity-50 rounded-3"
                id="password"
                name="password"
                placeholder="Enter password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-secondary w-100 fw-bold">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;