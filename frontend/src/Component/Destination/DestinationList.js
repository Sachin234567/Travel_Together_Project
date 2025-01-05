import React, { useEffect, useState } from 'react';
import './DestinationList.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DestinationList = () => {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signup'); // Redirect to signup if no token
    } else {
      axios
        .get('http://localhost:8080/api/destinations')
        .then((response) => {
          setDestinations(response.data);
          setFilteredDestinations(response.data); // Initially set filteredDestinations to all destinations
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching destinations:', error);
          setError('Failed to load destinations.');
          setLoading(false);
        });
    }
  }, [navigate]);

  // Handle the search query and filter the destinations
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter destinations based on search query
    if (query) {
      const filtered = destinations.filter((destination) =>
        destination.name.toLowerCase().includes(query.toLowerCase()) || 
        destination.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredDestinations(filtered);
    } else {
      setFilteredDestinations(destinations); // Show all destinations if search is cleared
    }
  };

  const handleDestinationClick = (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if not authenticated
    } else {
      navigate(`/destinations/${id}`); // Navigate to destination details page
    }
  };

  if (loading) return <p>Loading destinations...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="destination-list">
      <h2>Destinations</h2>

      {/* Search Input Field */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search destinations..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {filteredDestinations.length > 0 ? (
        <ul>
          {filteredDestinations.map((destination) => (
            <li key={destination.id} onClick={() => handleDestinationClick(destination.id)}>
              <h3>{destination.name}</h3>
              <p>{destination.description}</p>
              <p>Cost: ₹{destination.cost}</p>
              <p>Duration: {destination.duration} days</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No destinations available</p>
      )}
    </div>
  );
};

export default DestinationList;
