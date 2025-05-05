import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const handleToggle = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/bookrestaurant">Home</Link>
        <Link to="/bookrestaurant/restaurants">Restaurants</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
      <button onClick={handleToggle} className="toggle-button">
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </nav>
  );
}

export default Navbar;
