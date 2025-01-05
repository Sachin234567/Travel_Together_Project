import React, { useState, useEffect } from "react";
import axios from "axios";
import "./JoinDestination.css";

const JoinDestination = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    destinationName: "",
  });
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/destinations"
        );
        setDestinations(response.data);
      } catch (err) {
        console.error("Error fetching destinations:", err);
        setError("Failed to load destinations.");
      }
    };

    fetchDestinations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/join",
        formData
      );
      setSuccessMessage(response.data);
      setError("");
    } catch (err) {
      console.error("Error submitting form:", err);
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("Failed to join the destination. Please try again.");
      }
      setSuccessMessage("");
    }
  };

  return (
    <div className="join-destination-container">
      <div className="join-destination-form-wrapper">
        <h2>Join Destination</h2>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="destinationName">Select Destination</label>
          <select
            id="destinationName"
            name="destinationName"
            value={formData.destinationName}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Destination --</option>
            {destinations.map((destination) => (
              <option key={destination.id} value={destination.name}>
                {destination.name}
              </option>
            ))}
          </select>

          <button type="submit">Join</button>
        </form>
      </div>
    </div>
  );
};

export default JoinDestination;
