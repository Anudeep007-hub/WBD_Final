import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CalendarIcon, ClockIcon, UserIcon, PhoneIcon, MailIcon, UsersIcon, ArrowLeftIcon, CheckCircleIcon, XCircleIcon, MapPinIcon } from 'lucide-react';
import "./css/restaurantbooking.css";

const RestaurantBooking = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    numberOfGuests: 2
  });

  useEffect(() => {
    fetchRestaurantDetails();
  }, [restaurantId]);

  useEffect(() => {
    if (selectedTable && selectedDate) {
      fetchTimeSlots();
    }
  }, [selectedTable, selectedDate]);

  const fetchRestaurantDetails = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/hotels/${restaurantId}`);
      if (!response.ok) throw new Error('Failed to fetch restaurant details');
      const data = await response.json();
      setRestaurant(data);
      setTables(data.tables || []);
      setLoading(false);
    } catch (err) {
      setError('Failed to load restaurant details');
      setLoading(false);
    }
  };

  const fetchTimeSlots = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/tables/${selectedTable._id}/availability?date=${selectedDate}`
      );
      if (!response.ok) throw new Error('Failed to fetch time slots');
      const data = await response.json();
      setTimeSlots(data);
    } catch (err) {
      setError('Failed to load time slots');
    }
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotSelect = (slot) => {
    if (slot.isAvailable) {
      setSelectedTimeSlot(slot);
    }
  };

  const handleTableSelect = (table) => {
    setSelectedTable(table);
    setSelectedTimeSlot(null);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTable || !selectedDate || !selectedTimeSlot) {
      setError('Please select a table, date, and time slot');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurantId,
          tableId: selectedTable._id,
          date: selectedDate,
          startTime: selectedTimeSlot.startTime,
          endTime: selectedTimeSlot.endTime,
          ...formData
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create booking');
      }

      const bookingData = await response.json();
      navigate('/booking-confirmation', { state: { booking: bookingData } });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!restaurant) {
    return <div className="error">Restaurant not found</div>;
  }

  return (
    <div className="restaurant-booking">
      <div className="booking-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeftIcon /> Back
        </button>
        <h1>{restaurant.name}</h1>
      </div>

      <div className="booking-container">
        <div className="booking-section">
          <h2>Select Date</h2>
          <div className="date-picker">
            <CalendarIcon />
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              min={new Date().toISOString().split('T')[0]}
              max={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="booking-section">
          <h2>Select Table</h2>
          <div className="tables-grid">
            {tables.map((table) => (
              <div
                key={table._id}
                className={`table-card ${selectedTable?._id === table._id ? 'selected' : ''}`}
                onClick={() => handleTableSelect(table)}
              >
                <div className="table-header">
                  <span>Table {table.name}</span>
                  <span className="capacity">{table.capacity} seats</span>
                </div>
                <div className="table-details">
                  <MapPinIcon />
                  <span>{table.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedTable && selectedDate && (
          <div className="booking-section">
            <h2>Select Time Slot</h2>
            <div className="time-slots-grid">
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  className={`time-slot ${slot.isAvailable ? 'available' : 'unavailable'} ${
                    selectedTimeSlot?.startTime === slot.startTime ? 'selected' : ''
                  }`}
                  onClick={() => handleTimeSlotSelect(slot)}
                  disabled={!slot.isAvailable}
                >
                  {slot.startTime} - {slot.endTime}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedTable && selectedDate && selectedTimeSlot && (
          <div className="booking-section">
            <h2>Complete Your Booking</h2>
            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-group">
                <label>
                  <UserIcon /> Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <MailIcon /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <PhoneIcon /> Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <UsersIcon /> Number of Guests
                </label>
                <select
                  name="numberOfGuests"
                  value={formData.numberOfGuests}
                  onChange={handleInputChange}
                  required
                >
                  {[...Array(selectedTable.capacity)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="submit-button">
                Confirm Booking
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantBooking; 