import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ShopOwnerDashboard.css'; // Assuming you have a CSS file for styling

const ShopOwnerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="shop-owner-dashboard">
      <h1>Restaurant Manager Dashboard</h1>
      <div className="dashboard-grid">
      <div className="dashboard-card">
          <h2>Manager Profile</h2>
          <p>View your profile details.</p>
          <button onClick={() => navigate('/')}>Manage Profile</button>
        </div>
        <div className="dashboard-card">
          <h2>View Restaurants</h2>
          <p>See the current restaurants.</p>
          <button onClick={() => navigate('/')}>View Now</button>
        </div>
        <div className="dashboard-card">
          <h2>Add Restaurant</h2>
          <p>Add a new Restaurants.</p>
          <button onClick={() => navigate('/restaurant/AddRestaurant')}>Manage Now</button>
        </div>
        <div className="dashboard-card">
          <h2>Manage Restaurant Details</h2>
          <p>Update restaurants details.</p>
          <button onClick={() => navigate('/restaurant/AddRestaurant')}>Manage Now</button>
        </div>
        <div className="dashboard-card">
          <h2>Remove Restaurant</h2>
          <p>Remove restaurant.</p>
          <button onClick={() => navigate('/restaurant/AddRestaurant')}>Manage Now</button>
        </div>
      </div>
    </div>
  );
};

export default ShopOwnerDashboard;
