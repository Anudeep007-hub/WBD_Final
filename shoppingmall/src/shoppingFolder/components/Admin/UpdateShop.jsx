import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../components/css/Updateshop.css';
import mall from '../images/background3.png';

const UpdateShop = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/a/shops`);
      if (!response.ok) {
        throw new Error('Failed to fetch shops');
      }
      const data = await response.json();
      
      // Check if data is an array and contains required fields
      if (Array.isArray(data)) {
        const validShops = data.filter(
          shop => shop._id && shop.name && shop.location
        ); // Filter out invalid entries
        setShops(validShops);
      } else {
        throw new Error('Unexpected data format');
      }
    } catch (error) {
      console.error('Error fetching shops:', error);
      setError('Could not load shops. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (shopId) => {
    navigate(`/admin/update-shop/${shopId}`);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (shops.length === 0) {
    return <div className="no-shops-message">No shops available to display.</div>;
  }

  return (
    <div className="shops-list">
      <h1>Stores & Restaurants</h1>
      {shops.map(shop => (
        <div key={shop._id} className="shop-item">
          {/* Shop image */}
          <img src={mall} alt={shop.name} className="shop-image" />
          {/* Shop details */}
          <div className="shop-info">
            <h2>{shop.name}</h2>
            <p>{shop.location}</p>
            {shop.contact && <p>{shop.contact}</p>}
            <button onClick={() => handleUpdate(shop._id)}>Update</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpdateShop;
