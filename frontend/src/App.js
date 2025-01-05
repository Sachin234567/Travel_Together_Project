import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Component/LandingPage';
import Signup from './Component/Signup';
import Login from './Component/Login';
import DestinationList from './Component/Destination/DestinationList';
import AddDestination from './Component/Destination/AddDestination';
import JoinDestination from './Component/Destination/JoinDestination';
import Messaging from './Component/message/Messaging';
import CreateRoute from './Component/route/CreateRoute';
import ViewRoutes from './Component/route/ViewRoutes';

function App() {
  const [user, setUser] = useState(null); // Manage logged-in user state

  // Check if user is logged in from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')); // Or get from context
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/destinations" element={<DestinationList />} />
        <Route path="/add-destination" element={<AddDestination />} />
        <Route path="/join-destination" element={<JoinDestination />} />
        
        {/* Pass the 'user' prop to the Messaging component */}
        <Route path="/messages" element={<Messaging user={user} />} />

        {/* QuickGo Routes */}
        <Route path="/create-route" element={<CreateRoute />} />
        <Route path="/view-routes" element={<ViewRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
