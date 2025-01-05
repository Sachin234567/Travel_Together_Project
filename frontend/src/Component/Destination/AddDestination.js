import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './AddDestination.css';
import axios from 'axios';

const AddDestination = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cost: '',
    duration: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.cost || !formData.duration) {
      setError('Please fill in all fields.');
      setMessage('');
      return;
    }

    if (formData.cost <= 0 || formData.duration <= 0) {
      setError('Cost and duration must be greater than zero.');
      setMessage('');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/destinations/add', formData);
      setMessage(response.data); // Success message
      setError('');
      setFormData({
        name: '',
        description: '',
        cost: '',
        duration: '',
      });

      // Redirect to the homepage after 2 seconds
      setTimeout(() => {
        navigate('/'); // Adjust the path if your homepage route differs
      }, 2000);
    } catch (err) {
      console.error('Error adding destination:', err);
      setError(err.response?.data || 'Failed to add destination. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="add-destination-container">
      <h2>Add a Destination</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Destination Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="number"
          name="cost"
          placeholder="Cost (in Rs)"
          value={formData.cost}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (in days)"
          value={formData.duration}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Destination</button>
      </form>
    </div>
  );
};

export default AddDestination;
