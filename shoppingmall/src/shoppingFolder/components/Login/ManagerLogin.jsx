import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

import './Login.css';

const ManagerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/manager-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      console.log('eff')
  
      const data = await response.json();
      if (response.ok && data.token) {
        sessionStorage.setItem('token', data.token);
  
        const decodedToken = jwtDecode(data.token);
        localStorage.setItem('manager', JSON.stringify(decodedToken));
  
        const { section } = decodedToken; // Get section from the token
  
        if (section === 'sports') {
          navigate('/sport/owner'); // Redirect to sports section
        } else if (section === 'restaurant') {
          navigate('/restaurant/manager'); // Redirect to restaurant section
        }
        else if (section === 'theatre') {
          navigate('/theatre/manager'); // Redirect to restaurant section
        }
         else {
          navigate('/'); // Default redirect
        }
      } else {
        alert('Invalid login credentials for manager.');
      }
    } catch (error) {
      console.error('Manager Login error:', error);
      alert('An error occurred during manager login.');
    }
  };
  
  return (
    <div className="Login">
      <div className="wrapper">
        <h1>Manager Login</h1>
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
            <button type="submit" className="loginButton">Login as Manager</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManagerLogin;
