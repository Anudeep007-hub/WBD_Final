// components/UpdateDeal.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateDealDetail = () => {
  const { id } = useParams(); // Get the deal ID from the URL
  const navigate = useNavigate();
  const [deal, setDeal] = useState({
    store: '',
    description: '',
    expiration: '',
    image: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/deals/${id}`);
        const data = await response.json();
        setDeal(data);
      } catch (error) {
        console.error('Error fetching deal:', error);
      }
    };

    fetchDeal();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeal((prevDeal) => ({
      ...prevDeal,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const today = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD format

    if (deal.store.trim().length < 3) {
      newErrors.store = "Store name must be at least 3 characters long.";
    }
    if (deal.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters long.";
    }
    if (deal.expiration && deal.expiration < today) {
      newErrors.expiration = "Expiration date must be in the future.";
    }
    if (deal.image && !/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(deal.image)) {
      newErrors.image = "Please enter a valid image URL ending in .jpg, .png, etc.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop if validation fails

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/deals/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deal),
      });
      if (response.ok) {
        navigate('/shopowner/view-deals'); // Redirect after update
      } else {
        console.error('Failed to update deal');
      }
    } catch (error) {
      console.error('Error updating deal:', error);
    }
  };

  return (
    <div>
      <h1>Update Deal</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Store:</label>
          <input
            type="text"
            name="store"
            value={deal.store}
            onChange={handleChange}
            required
          />
          {errors.store && <p className="error">{errors.store}</p>}
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={deal.description}
            onChange={handleChange}
            required
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        <div>
          <label>Expiration:</label>
          <input
            type="date"
            name="expiration"
            value={deal.expiration.split('T')[0]} // Format date for input
            onChange={handleChange}
            required
          />
          {errors.expiration && <p className="error">{errors.expiration}</p>}
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={deal.image}
            onChange={handleChange}
            required
          />
          {errors.image && <p className="error">{errors.image}</p>}
        </div>
        <button type="submit">Update Deal</button>
      </form>
    </div>
  );
};

export default UpdateDealDetail;
