import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { CalendarIcon, ClockIcon, UserIcon, PhoneIcon, MailIcon, UsersIcon, ArrowLeftIcon, CheckCircleIcon, XCircleIcon, MapPinIcon } from 'lucide-react';
import "./css/bookingpage.css";

function BookingPage() {
  const { tableId } = useParams();
  const location = useLocation();
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: location.state?.date || new Date().toISOString().split('T')[0],
    startTime: location.state?.startTime || '11:00',
    endTime: location.state?.endTime || '12:00',
    guests: 2
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tableAvailability, setTableAvailability] = useState({});
  const navigate = useNavigate();

  // Generate time slots from 10 AM to 10 PM
  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = i + 10;
    return {
      startTime: `${hour.toString().padStart(2, '0')}:00`,
      endTime: `${(hour + 1).toString().padStart(2, '0')}:00`
    };
  });

  useEffect(() => {
    const fetchTables = async () => {
      try {
        // Fetch all tables (8 tables)
        const tablesResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/tables`);
        if (!tablesResponse.ok) {
          throw new Error('Failed to fetch tables');
        }
        const tablesData = await tablesResponse.json();
        setTables(tablesData);

        // Check availability for each table
        const availabilityPromises = tablesData.map(async (table) => {
          const availabilityResponse = await fetch(
            `${process.env.REACT_APP_API_URL}/api/table-availability/${table._id}?date=${formData.date}`
          );
          if (!availabilityResponse.ok) {
            throw new Error('Failed to check table availability');
          }
          const availabilityData = await availabilityResponse.json();
          return {
            tableId: table._id,
            availableSlots: availabilityData.availableSlots
          };
        });

        const availabilityResults = await Promise.all(availabilityPromises);
        const availabilityMap = availabilityResults.reduce((acc, result) => {
          acc[result.tableId] = result.availableSlots;
          return acc;
        }, {});
        setTableAvailability(availabilityMap);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message || 'Error loading tables');
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, [formData.date]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTableSelect = (table) => {
    setSelectedTable(table);
  };

  const handleTimeSlotSelect = (startTime, endTime) => {
    setFormData({
      ...formData,
      startTime,
      endTime
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTable) {
      setError('Please select a table first');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/book-table`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ...formData, 
          tableId: selectedTable._id,
          date: formData.date,
          startTime: formData.startTime,
          endTime: formData.endTime
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to book the table');
      }

      navigate('/bookrestaurant/confirmation', { 
        state: { 
          bookingDetails: data,
          tableDetails: selectedTable
        }
      });
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to book the table');
    }
  };

  const isSlotAvailable = (tableId, startTime, endTime) => {
    const tableSlots = tableAvailability[tableId] || [];
    return tableSlots.some(slot => 
      slot.startTime === startTime && 
      slot.endTime === endTime && 
      slot.isAvailable
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="error-container">
          <h3 className="error-title">Booking Error</h3>
          <p className="error-message">{error}</p>
          <Link to="/bookrestaurant/restaurants" className="error-button">
            Return to Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-container">
        <div className="booking-sidebar">
          <div className="sidebar-content">
            <h2 className="sidebar-title">Reservation Details</h2>
            
            {/* Date Selection */}
            <div className="form-section">
              <h3>Select Date</h3>
              <div className="form-group">
                <div className="input-container">
                  <CalendarIcon className="input-icon" />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Time Slots */}
            <div className="form-section">
              <h3>Available Time Slots</h3>
              <div className="time-slots-grid">
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    className={`time-slot-button ${
                      formData.startTime === slot.startTime ? 'selected' : ''
                    }`}
                    onClick={() => handleTimeSlotSelect(slot.startTime, slot.endTime)}
                  >
                    {slot.startTime} - {slot.endTime}
                  </button>
                ))}
              </div>
            </div>

            {/* Tables Grid */}
            <div className="form-section">
              <h3>Available Tables</h3>
              <div className="tables-grid">
                {tables.map((table) => (
                  <div
                    key={table._id}
                    className={`table-card ${
                      selectedTable?._id === table._id ? 'selected' : ''
                    } ${isSlotAvailable(table._id, formData.startTime, formData.endTime) ? 'available' : 'unavailable'}`}
                    onClick={() => isSlotAvailable(table._id, formData.startTime, formData.endTime) && handleTableSelect(table)}
                  >
                    <div className="table-header">
                      <span className="table-number">Table {table.name}</span>
                      {isSlotAvailable(table._id, formData.startTime, formData.endTime) ? (
                        <CheckCircleIcon className="status-icon available" />
                      ) : (
                        <XCircleIcon className="status-icon unavailable" />
                      )}
                    </div>
                    <div className="table-details">
                      <div className="capacity">
                        <UsersIcon className="capacity-icon" />
                        <span>{table.capacity} Seats</span>
                      </div>
                      <div className="location">
                        <MapPinIcon className="location-icon" />
                        <span>{table.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Form */}
            {selectedTable && (
              <div className="form-section">
                <h3>Complete Your Booking</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <div className="input-container">
                      <UserIcon className="input-icon" />
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <div className="input-container">
                      <PhoneIcon className="input-icon" />
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="input-container">
                      <MailIcon className="input-icon" />
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="guests">Number of Guests</label>
                    <div className="input-container">
                      <UsersIcon className="input-icon" />
                      <select
                        id="guests"
                        name="guests"
                        value={formData.guests}
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
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="submit-button"
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.phone || !formData.email}
                >
                  Confirm Reservation
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;