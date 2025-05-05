import React, { useState } from 'react';
import './css/signup.css'; // Import the CSS file

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send formData to backend for user creation
    console.log(formData); // Replace with actual API call
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign Up</h2>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />  
        </div>
        <button type="submit" className="submit-btn">Sign Up</button>
        {/* Add error message handling if needed */}
        {/* <div className="error-message">{errorMessage}</div> */}
      </form>
    </div>
  );
}

export default Signup;
