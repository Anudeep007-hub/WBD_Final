import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import './Login.css';

const ShopOwnerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/shopowner-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok && data.token) {
        // Save the token in sessionStorage
        sessionStorage.setItem('token', data.token);

        // Decode the token to get the user's info
        const decodedToken = jwtDecode(data.token);
        localStorage.setItem('shopOwner', JSON.stringify(decodedToken));

        // Redirect to the shop owner dashboard or homepage
        navigate('/shopowner/dashboard');
      } else {
        alert('Invalid login credentials for Shop Owner');
      }
    } catch (error) {
      console.error('ShopOwner Login error:', error);
      alert('An error occurred during login.');
    }
  };

  return (
    <div className="Login">
    <div className="wrapper">
      <h1>Shop Owner Login</h1>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className="bx bxs-envelope"></i>
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <button type="submit" className="loginButton">Login as ShopOwner</button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default ShopOwnerLogin;
