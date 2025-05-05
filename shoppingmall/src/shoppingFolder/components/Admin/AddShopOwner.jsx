import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddShopOwner = () => {
  const [shops, setShops] = useState([]);
  const [shopId, setShopId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_REACT_APP_API_URL}/api/shops`);
      if (!response.ok) {
        throw new Error('Failed to fetch shops');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setShops(data);
      } else {
        throw new Error('Expected an array of shops');
      }
    } catch (error) {
      console.error('Error fetching shops:', error);
      setError('Failed to load shops. Please try again later.');
    }
  };

  const validateForm = () => {
    const errors = {};

    // Shop selection validation
    if (!shopId) {
      errors.shopId = 'Please select a shop.';
    }

    // Name validation
    if (name.trim().length < 3) {
      errors.name = 'Name must be at least 3 characters long.';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    // Contact validation
    const contactRegex = /^\d{10,}$/;
    if (!contactRegex.test(contact)) {
      errors.contact = 'Contact number must be at least 10 digits.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddShopOwner = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/add-shopowners/${shopId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, contact }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add shop owner');
      }

      alert('Shop owner added successfully!');
      navigate('/admin/view-shopowners');
    } catch (error) {
      console.error('Error adding shop owner:', error);
      setError(error.message || 'An error occurred while adding the shop owner.');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="add-shop-owner-container">
      <h1>Add Shop Owner</h1>
      <form onSubmit={handleAddShopOwner}>
        <div>
          <label htmlFor="shop-select">Select Shop:</label>
          <select 
            id="shop-select"
            value={shopId} 
            onChange={(e) => setShopId(e.target.value)} 
            required
          >
            <option value="">Select a shop</option>
            {shops.map(shop => (
              <option key={shop._id} value={shop._id}>
                {shop.name}
              </option>
            ))}
          </select>
          {formErrors.shopId && <p className="error">{formErrors.shopId}</p>}
        </div>
        <div>
          <label htmlFor="name-input">Name:</label>
          <input
            id="name-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {formErrors.name && <p className="error">{formErrors.name}</p>}
        </div>
        <div>
          <label htmlFor="email-input">Email:</label>
          <input
            id="email-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {formErrors.email && <p className="error">{formErrors.email}</p>}
        </div>
        <div>
          <label htmlFor="contact-input">Contact:</label>
          <input
            id="contact-input"
            type="tel"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
          {formErrors.contact && <p className="error">{formErrors.contact}</p>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Shop Owner'}
        </button>
      </form>
    </div>
  );
};

export default AddShopOwner;
