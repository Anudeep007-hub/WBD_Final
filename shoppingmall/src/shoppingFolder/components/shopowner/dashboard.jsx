import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ShopOwnerDashboard.css'; // Assuming you have a CSS file for styling

const ShopOwnerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="shop-owner-dashboard">
      <h1>Shop Owner Dashboard</h1>
      <div className="dashboard-grid">
      <div className="dashboard-card">
          <h2>Shop Owner Profile</h2>
          <p>View your profile details.</p>
          <button onClick={() => navigate('/shopowner/profile')}>Manage Profile</button>
        </div>
        <div className="dashboard-card">
          <h2>View Deals</h2>
          <p>See the current deals for your shop.</p>
          <button onClick={() => navigate('/shopowner/view-deals')}>View Now</button>
        </div>
        <div className="dashboard-card">
          <h2>Add Deals</h2>
          <p>Add new deals to your shop's offerings.</p>
          <button onClick={() => navigate('/shopowner/add-deals')}>Manage Now</button>
        </div>
      </div>
    </div>
  );
};

export default ShopOwnerDashboard;
