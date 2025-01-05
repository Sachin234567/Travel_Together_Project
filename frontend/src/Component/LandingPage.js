import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const [showMenu, setShowMenu] = useState(false); // State to toggle menu visibility
  const navigate = useNavigate();

  // Handle navigation to the Destinations page (after checking authentication)
  const handleDestinationsClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signup"); // If no token, redirect to signup page
    } else {
      navigate("/destinations"); // Navigate to destinations list if logged in
    }
  };

  // Toggle the menu (hamburger)
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          {/* Hamburger menu (three lines) */}
          <button className="hamburger-menu" onClick={toggleMenu}>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </button>
        </div>

        <div className="navbar-center">
          <h1 className="project-name">Travel Together</h1>
        </div>

        <div className="navbar-right">
          <ul>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <button onClick={handleDestinationsClick}>Destinations</button>
            </li>{" "}
            {/* Button for destinations */}
          </ul>
        </div>
      </nav>

      {/* Display the menu links when hamburger is clicked */}
      {showMenu && (
        <div className="navbar-menu">
          <ul>
            {/* Add the Messages link */}
            <li>
              <Link to="/messages">Messaging</Link>
            </li>
            {/* Existing QuickGo links */}
            <li>
              <Link to="/create-route">Create Route</Link>
            </li>
            <li>
              <Link to="/view-routes">View Routes</Link>
            </li>
          </ul>
        </div>
      )}

      {/* Welcome Message */}
      <div className="welcome-message">
        <h2>Welcome to Travel Together</h2>
        <p>
          Your journey begins here. Start exploring and plan your next adventure
          today!
        </p>
      </div>

      {/* Get Started Button */}
      <div className="get-started-btn">
        <Link to="/join-destination">
          <button className="action-btn join-destination-btn">
            Join Destination
          </button>
        </Link>

        <Link to="/add-destination">
          <button className="action-btn add-destination-btn">
            Add Destination
          </button>
        </Link>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="about">
          <h3>About Us</h3>
          <p>
            We are Travel Together, a platform that helps you discover, plan,
            and join amazing travel destinations with fellow travelers.
          </p>
        </div>
        <div className="contact">
          <h3>Contact</h3>
          <p>Email: sachinmavi0047@gmail.com</p>
          <p>Phone: +91 8193049315</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
