import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTables = () => {
  const [hotels, setHotels] = useState([]);  // Store all restaurants
  const [selectedHotelId, setSelectedHotelId] = useState(''); // Selected restaurant ID
  const [selectedSlot, setSelectedSlot] = useState(''); // Selected time slot
  const [tables, setTables] = useState([]); // Store fetched tables for selected slot
  const [form, setForm] = useState({ name: '', capacity: '' }); // Form inputs
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);

  // 🔥 Generate time slots from 10 AM to 10 PM
  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = i + 10;
    return hour < 12 ? `${hour}:00 AM to ${hour + 1}:00 AM` : 
           hour === 12 ? `12:00 PM to 1:00 PM` : 
           `${hour - 12}:00 PM to ${hour - 11}:00 PM`;
  });

  // 🔥 Fetch all restaurants when component mounts
  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/hotels`);
        setHotels(response.data);
      } catch (err) {
        setError('Failed to fetch restaurants');
      }
      setLoading(false);
    };
    fetchHotels();
  }, []);

  // 🔥 Fetch tables for selected restaurant & slot
  const fetchTables = async (hotelId, slot) => {
    if (!hotelId || !slot) return;
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/hotels/${hotelId}/tables?slot=${slot}`);
      setTables(response.data);
    } catch (err) {
      setError('Failed to fetch tables');
    }
    setLoading(false);
  };

  // ✅ Handle restaurant selection
  const handleHotelSelect = (e) => {
    setSelectedHotelId(e.target.value);
    setTables([]); // Reset tables when restaurant changes
    setSelectedSlot(''); // Reset slot when restaurant changes
  };

  // ✅ Handle slot selection & fetch tables
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    fetchTables(selectedHotelId, slot);
  };

  // ✅ Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle adding a table (send correct restaurant & slot)
  const handleAddTable = async (e) => {
    e.preventDefault();
    setAdding(true);
    setError(null);

    // 🔴 Validate form
    if (!selectedHotelId) {
      setError('Please select a restaurant first.');
      setAdding(false);
      return;
    }
    if (!selectedSlot) {
      setError('Please select a time slot first.');
      setAdding(false);
      return;
    }
    if (!form.name || !form.capacity) {
      setError('Please enter table name and capacity.');
      setAdding(false);
      return;
    }

    // 🔴 Validate capacity
    const capacityNum = parseInt(form.capacity);
    if (isNaN(capacityNum) || capacityNum < 1 || capacityNum > 10) {
      setError('Capacity must be a number between 1 and 10.');
      setAdding(false);
      return;
    }

    try {
      const token = localStorage.getItem('token'); // 🔥 Ensure token is sent

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/hotels/${selectedHotelId}/tables`,
        {
          slot: selectedSlot,
          name: form.name,
          capacity: capacityNum
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Send authentication token
            'Content-Type': 'application/json'
          }
        }
      );

      // ✅ Add new table to list
      setTables([...tables, res.data]);

      // ✅ Reset form
      setForm({ name: '', capacity: '' });

      // ✅ Clear error message
      setError(null);
    } catch (err) {
      console.error('Error adding table:', err);
      setError(err.response?.data?.message || 'Failed to add table');
    }
    
    setAdding(false);
  };

  return (
    <div>
      <h1>Add Tables to Restaurant</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* 🔥 Step 1: Select Restaurant */}
      <div>
        <label>Select Restaurant: </label>
        <select value={selectedHotelId} onChange={handleHotelSelect}>
          <option value=''>-- Select --</option>
          {hotels.map(hotel => (
            <option value={hotel._id} key={hotel._id}>{hotel.name}</option>
          ))}
        </select>
      </div>

      {/* 🔥 Step 2: Select Time Slot */}
      {selectedHotelId && (
        <>
          <h2>Select Time Slot</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
            {timeSlots.map(slot => (
              <button
                key={slot}
                onClick={() => handleSlotSelect(slot)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: selectedSlot === slot ? '#4CAF50' : '#f0f0f0',
                  color: selectedSlot === slot ? 'white' : 'black',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {slot}
              </button>
            ))}
          </div>

          {/* 🔥 Step 3: Show existing tables */}
          {selectedSlot && (
            <>
              <h2>Existing Tables for {selectedSlot}</h2>
              {loading ? <p>Loading tables...</p> : (
                <ul>
                  {tables.length === 0 ? <li>No tables found for this slot.</li> : tables.map(table => (
                    <li key={table._id}>
                      Table {table.name} | Capacity: {table.capacity} | {table.isAvailable ? 'Available' : 'Occupied'}
                    </li>
                  ))}
                </ul>
              )}

              {/* 🔥 Step 4: Add New Table */}
              <h2>Add New Table for {selectedSlot}</h2>
              <form onSubmit={handleAddTable}>
                <input name='name' value={form.name} onChange={handleChange} placeholder='Table Name' required />
                <input name='capacity' type='number' value={form.capacity} min='1' max='10' onChange={handleChange} placeholder='Capacity' required />

                <button type='submit' disabled={adding}>Add Table</button>
              </form>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AddTables;
