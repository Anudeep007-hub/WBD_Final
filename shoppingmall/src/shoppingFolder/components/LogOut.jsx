const logout = () => {
    localStorage.removeItem('token');
    // Redirect to login page or home page
    window.location.href = '/login';
};

module.exports = logout;