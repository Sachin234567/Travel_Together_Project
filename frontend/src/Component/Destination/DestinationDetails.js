import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DestinationDetails.css';

const DestinationDetails = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/destinations/${id}`)
      .then((response) => {
        setDestination(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching destination details:', error);
        setError('Failed to load destination details.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading destination details...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="destination-details">
      <h2>{destination.name}</h2>
      <p>{destination.description}</p>
      <p>Cost: ${destination.cost}</p>
      <p>Duration: {destination.duration} days</p>
      <h3>Added by:</h3>
      <p>Name: {destination.user.username || 'Unknown'}</p>
      <p>Email: {destination.user.email}</p>
    </div>
  );
};

export default DestinationDetails;
