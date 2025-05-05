import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove token and user data from storage
        sessionStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Redirect to login page (or home page, as preferred)
        navigate('/login'); // Adjust based on your login route
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;
