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
    <>
      <div className="d-flex justify-content-end me-3">
        <Link to="/register" className="secondary-btn btn btn-outline-secondary text-light fw-bold mb-5">
          Register
        </Link>
      </div>

      <div className="container d-flex justify-content-center align-items-center">
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

            <button type="submit" className="main-btn btn btn-secondary w-100 fw-bold main-btn fw-bold my-2">
              Login
            </button>
          </form>

        </div>
      </div>

      <div className="card shadowbg-light w-25 m-auto border border-secondary rounded-2 my-5">
        <p className="fw-bold pt-3">Give it a try:</p>
        <p> This app's frontend is currently deployed, but the backend is not being hosted. Full functionality, including login and book tracking, requires running the backend
    and MySQL database locally.</p>
        <p className="mb-2">Feel free to fork the repo and follow the setup instructions in the README to run the full app on your computer.</p>
        <Link to="https://github.com/NereidaRondon/books.git">GitHub Repo</Link>  
      </div>
    </>
  );
};

export default Login;