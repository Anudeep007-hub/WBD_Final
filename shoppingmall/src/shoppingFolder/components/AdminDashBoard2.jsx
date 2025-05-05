import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { motion } from 'framer-motion';

const AdminDashboard2 = () => {
  const [stats, setStats] = useState({
    users: 87,
    shopOwners: 54,
    shops: 65,
    shopOwnersAssigned: 42,
    shopOwnersUnassigned: 23,
    SportbookingTrue: 32,
    SportbookingFalse: 18
  });

  useEffect(() => {
 
    fetch(`${process.env.REACT_APP_API_URL}/stats`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Fetched stats:', data);
        
        // Calculate unassigned shop owners
        const totalShopOwners = data.shopOwnersCount;
        const assignedShopOwners = data.shopOwnersAssignedCount;
        
        setStats({
          users: data.usersCount,
          shopOwners: totalShopOwners,
          shops: data.shopsCount,
          shopOwnersAssigned: assignedShopOwners,
          shopOwnersUnassigned: data.shopsCount-totalShopOwners,
          SportbookingTrue: data.SportbookingTrue,
          SportbookingFalse: data.SportbookingFalse
        });
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }, []);

  // Prepare data for the bar chart
  const barData = [
    { name: 'Users', count: stats.users },
    { name: 'Shop Owners', count: stats.shopOwners },
    { name: 'Shops', count: stats.shops },
  ];

  // Prepare data for the pie charts
  const pieData = [
    { name: 'Assigned Shops', value: stats.shopOwnersAssigned },
    { name: 'Unassigned Shops', value: stats.shopOwnersUnassigned },
  ];

  const pieData2 = [
    { name: 'Booked Slots', value: stats.SportbookingTrue },
    { name: 'Unbooked Slots', value: stats.SportbookingFalse},
  ];

  // Define colors for the pie charts - Holi colors
  const COLORS = ['#FF9A9E', '#00F5D4'];
  const COLORS2 = ['#9B5DE5', '#F15BB5'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="charts-container">
      <motion.div 
        className="charts-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Bar chart section */}
        <motion.div className="chart-card" variants={itemVariants}>
          <h3 className="chart-title">Mall Statistics</h3>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                    borderRadius: '10px', 
                    border: 'none',
                    color: '#333'
                  }}
                />
                <Legend />
                <Bar dataKey="count" fill="#FF9A9E" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pie chart for shop assignments */}
        <motion.div className="chart-card" variants={itemVariants}>
          <h3 className="chart-title">Shop Owner Assignments</h3>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                    borderRadius: '10px', 
                    border: 'none',
                    color: '#333'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pie chart for sport bookings */}
        <motion.div className="chart-card" variants={itemVariants}>
          <h3 className="chart-title">Sport Facility Bookings</h3>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData2}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData2.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                    borderRadius: '10px', 
                    border: 'none',
                    color: '#333'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard2;