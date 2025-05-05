import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Assuming this is your Auth context
import { useNavigate } from 'react-router-dom'; // For redirect after login
import './css/login.css';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);  // For updating the context after successful login
  const navigate = useNavigate();  // Hook for navigation after login

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const role = document.querySelector('select[name="role"]').value; // Get the selected role

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...credentials, role }), // Include role in the request body
      });

      const data = await response.json();

      if (response.ok) {
        const { token } = data;
        localStorage.setItem('authToken', token);  // Store token in localStorage
        login(token);  // Update global context with token (if using context for auth state)
        
        // Redirect based on role
        if (role === 'admin') {
          navigate('/admin-dashboard');  // Redirect to the admin dashboard
        } else if (role === 'owner') {
          navigate('/owner-dashboard');  // Redirect to the owner dashboard
        } else if (role === 'customer') {
          navigate('/customer-dashboard');  // Redirect to the customer dashboard
        } else {
          navigate('/');  // Default redirect if no role matched
        }
      } else {
        alert(data.error);  // Show error message from server
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed');  // Handle error gracefully
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
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
        <div className="input-group">
          <label htmlFor="role">Role</label>
          <select name="role" onChange={handleChange} required>
            <option value="customer">Customer</option>
            <option value="owner">Restaurant Owner</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
}

export default Login;
