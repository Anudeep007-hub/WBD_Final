import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/css/AdminDashboard.css';
import { motion } from 'framer-motion';
import AdminDashboard2 from './AdminDashBoard2';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate authentication check
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Animation variants
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

  const handleNavigation = (path) => {
    navigate(path);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Mall Admin</h2>
        </div>
        <div className="sidebar-menu">
        </div>
        <div className="sidebar-footer">
          <div className="menu-item logout">
            <span className="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            </span>
            <span>Logout</span>
          </div>
        </div>
      </div>

      <div className="main-content">
        <header className="dashboard-header">
          <div className="header-left">
            <h1>Mall Administration</h1>
          </div>
          <div className="user-profile">
            <div className="notification-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            </div>
            <div className="profile-avatar">A</div>
          </div>
        </header>
        
          
        
        <motion.div 
          className="management-section"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2>Management Tools</h2>
          <div className="management-grid">
            <motion.div className="management-card" variants={itemVariants} onClick={() => handleNavigation('/admin/add-shop')}>
              <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3zM12 8v8M8 12h8"></path></svg>
              </div>
              <div className="card-content">
                <h3>Add Shops</h3>
                <p>Register new shops to the mall directory</p>
              </div>
              <div className="card-action">
                <span>Manage</span>
                <span className="arrow">→</span>
              </div>
            </motion.div>

            <motion.div className="management-card" variants={itemVariants} onClick={() => handleNavigation('/admin/add-restro')}>
              <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3zM12 8v8M8 12h8"></path></svg>
              </div>
              <div className="card-content">
                <h3>Add Restaurants</h3>
                <p>Register new restaurants to the mall directory</p>
              </div>
              <div className="card-action">
                <span>Add</span>
                <span className="arrow">→</span>
              </div>
            </motion.div>

            <motion.div className="management-card" variants={itemVariants} onClick={() => handleNavigation('/admin/update-shop')}>
              <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </div>
              <div className="card-content">
                <h3>Update Shops</h3>
                <p>Modify details of existing shops</p>
              </div>
              <div className="card-action">
                <span>Manage</span>
                <span className="arrow">→</span>
              </div>
            </motion.div>

            <motion.div className="management-card" variants={itemVariants} onClick={() => handleNavigation('/admin/update-restro')}>
              <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </div>
              <div className="card-content">
                <h3>Update Restaurants</h3>
                <p>Modify details of existing restaurants</p>
              </div>
              <div className="card-action">
                <span>Update</span>
                <span className="arrow">→</span>
              </div>
            </motion.div>

            <motion.div className="management-card" variants={itemVariants} onClick={() => handleNavigation('/admin/add-tables')}>
              <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </div>
              <div className="card-content">
                <h3>Add Tables</h3>
                <p>Add new tables to the mall directory</p>
              </div>
              <div className="card-action">
                <span>Add</span>
                <span className="arrow">→</span>
              </div>
            </motion.div>

            <motion.div className="management-card" variants={itemVariants} onClick={() => handleNavigation('/admin/view-shops')}>
              <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
              <div className="card-content">
                <h3>View Shops</h3>
                <p>Browse all shops in the mall directory</p>
              </div>
              <div className="card-action">
                <span>View</span>
                <span className="arrow">→</span>
              </div>
            </motion.div>

            <motion.div className="management-card" variants={itemVariants} onClick={() => handleNavigation('/admin/view-shopowners')}>
              <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <div className="card-content">
                <h3>View Shop Owners</h3>
                <p>Manage shop owner accounts and details</p>
              </div>
              <div className="card-action">
                <span>View</span>
                <span className="arrow">→</span>
              </div>
            </motion.div>

            <motion.div className="management-card" variants={itemVariants} onClick={() => handleNavigation('/admin/add-manager')}>
              <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
              </div>
              <div className="card-content">
                <h3>Add Managers</h3>
                <p>Register new management personnel</p>
              </div>
              <div className="card-action">
                <span>Manage</span>
                <span className="arrow">→</span>
              </div>
            </motion.div>

            <motion.div className="management-card" variants={itemVariants} onClick={() => handleNavigation('/admin/viewFeedBack')}>
              <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </div>
              <div className="card-content">
                <h3>View Feedback</h3>
                <p>Review customer and tenant feedback</p>
              </div>
              <div className="card-action">
                <span>View</span>
                <span className="arrow">→</span>
              </div>
            </motion.div>

            {/* Add AdminDashboard2 component for charts */}
            <AdminDashboard2 />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
