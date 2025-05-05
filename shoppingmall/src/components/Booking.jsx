import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaUsers, FaCalendar, FaClock, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import '../components/css/booking.css';

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { hotelId, tableId } = useParams();
  const { date, startTime, endTime } = location.state || {};
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    numberOfGuests: 1
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if all required data is present
    if (!date || !startTime || !endTime || !tableId) {
      setError('Missing booking information. Please select a table and time slot first.');
    }
  }, [date, startTime, endTime, tableId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tableId,
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
          customerPhone: formData.customerPhone,
          date,
          startTime,
          endTime,
          numberOfGuests: formData.numberOfGuests
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create booking');
      }

      alert('Booking created successfully!');
      navigate('/bookrestaurant/restaurants');
    } catch (err) {
      console.error('Booking error:', err);
      setError(err.message || 'Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!date || !startTime || !endTime || !tableId) {
    return (
      <div className="booking-error">
        <h2>Invalid Booking Request</h2>
        <p>Please select a date and time slot first.</p>
        <button onClick={() => navigate('/bookrestaurant/restaurants')} className="back-button">
          Return to Restaurants
        </button>
      </div>
    );
  }

  return (
    <div className="booking-container">
      <div className="booking-header">
        <h1>Complete Your Booking</h1>
        <div className="booking-details">
          <div className="detail-item">
            <FaCalendar className="detail-icon" />
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          <div className="detail-item">
            <FaClock className="detail-icon" />
            <span>{startTime} - {endTime}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label htmlFor="customerName">
            <FaUser className="form-icon" />
            Full Name
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="customerEmail">
            <FaEnvelope className="form-icon" />
            Email
          </label>
          <input
            type="email"
            id="customerEmail"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={handleChange}
            required
            placeholder="Enter your email address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="customerPhone">
            <FaPhone className="form-icon" />
            Phone Number
          </label>
          <input
            type="tel"
            id="customerPhone"
            name="customerPhone"
            value={formData.customerPhone}
            onChange={handleChange}
            required
            placeholder="Enter your phone number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="numberOfGuests">
            <FaUsers className="form-icon" />
            Number of Guests
          </label>
          <input
            type="number"
            id="numberOfGuests"
            name="numberOfGuests"
            min="1"
            max="10"
            value={formData.numberOfGuests}
            onChange={handleChange}
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/bookrestaurant/restaurants')}
            className="cancel-button"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Creating Booking...' : 'Confirm Booking'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Booking; 