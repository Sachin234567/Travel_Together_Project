import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make sure the URL matches your Spring Boot backend
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        formData
      );

      // Save token to localStorage (or context for global auth state)
      const { token } = response.data; // Destructure token
      localStorage.setItem("token", token); // Ensure backend sends token
      localStorage.setItem("loginMessage", "Logged in successfully!");

      // Set success message
      setSuccessMessage("Login successful! Redirecting...");

      setError(""); // Clear any previous error message

      // Delay redirect to show success message
      setTimeout(() => {
        navigate("/"); // Redirect to the Landing Page after login
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setError(error.response?.data || "Invalid email or password."); // Show error message to the user
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Error message display */}
      {successMessage && (
        <p className="success-message">{successMessage}</p>
      )}{" "}
      {/* Success message display */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account? <Link to="/signup">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
