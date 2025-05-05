import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShopOwnerProfile.css';

const ShopOwnerProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    contact: '',
    shop: '',
  });
  const [isEditing, setIsEditing] = useState(false); // Toggle between view and edit modes
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/shopowner/login'); // Redirect if not logged in
    } else {
      // Fetch the shop owner's profile details
      fetch(`${process.env.REACT_APP_API_URL}/api/shopowner/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => setProfile(data))
        .catch((error) => console.error('Error fetching profile:', error));
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/shopowner/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });
      if (response.ok) {
        alert('Profile updated successfully!');
        setIsEditing(false); // Switch back to view mode
      } else {
        alert('Error updating profile!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="shop-owner-profile">
      <h1>Shop Owner Profile</h1>
      {isEditing ? (
        <form onSubmit={handleSave}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              readOnly // Email is not editable
            />
          </div>
          <div>
            <label>Contact:</label>
            <input
              type="text"
              name="contact"
              value={profile.contact}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Shop Name:</label>
            <input
              type="text"
              name="shop"
              value={profile.shop}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <div>
            <label>Name:</label>
            <p>{profile.name}</p>
          </div>
          <div>
            <label>Email:</label>
            <p>{profile.email}</p>
          </div>
          <div>
            <label>Contact:</label>
            <p>{profile.contact}</p>
          </div>
          <div>
            <label>Shop Name:</label>
            <p>{profile.shop}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopOwnerProfile;
