import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import "../css/ShopOwnerDashboard.css";

const SportDashboard2 = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    SportbookingTrue: 0,
    SportbookingFalse: 0
  });
  const [allBookings, setAllBookings] = useState([]); // Store all bookings

  useEffect(() => {
    // Fetch booking stats
    fetch(`${process.env.REACT_APP_REACT_APP_API_URL}/stats`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Fetched stats:', data);
        setStats({
          SportbookingTrue: data.SportbookingTrue,
          SportbookingFalse: data.SportbookingFalse
        });
      })
      .catch((err) => {
        console.error('Error:', err);
      });

    // Fetch all bookings
    fetch(`${process.env.REACT_APP_API_URL}/get_all_bookings`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Fetched bookings:', data);
        setAllBookings(data); // Store all bookings
      })
      .catch((err) => {
        console.error('Error fetching all bookings:', err);
      });
  }, [navigate]);

  const pieData2 = [
    { name: 'Booked Slots', value: stats.SportbookingTrue },
    { name: 'UnBooked Slots', value: stats.SportbookingFalse },
  ];

  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <div className="admin-body">
      <div className="management-box stats-graph">
        <h3>Booked Sport Slots</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData2}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData2.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="container">
        <h3 className="title">All Bookings</h3>
        <div className="table-container">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Sports Bookings</th>
                <th>Booking Date</th>
              </tr>
            </thead>
            <tbody>
              {allBookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.email}</td>
                  <td>
                    {booking.sports_bookings.map((sport, i) => (
                      <span key={i} className="sport-tag">
                        {sport}
                      </span>
                    ))}
                  </td>
                  <td>{new Date(booking.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SportDashboard2;
