import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X, LogOut } from 'lucide-react';
import '../components/css/Header.css'; // Adjust the path as necessary

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleLogout = () => {
    // Clear the token from storage
    sessionStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to home page
    navigate('/');
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <span className="logo">
              <ShoppingBag className="logo-icon" />
              <span>MALL</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <Link to="/" className="nav-link">
            <span className="nav-link-text">Home</span>
          </Link>
          <Link to="/shoplist" className="nav-link">
            <span className="nav-link-text">Shops</span>
          </Link>
          <Link to="/deals" className="nav-link">
            <span className="nav-link-text">Deals</span>
          </Link>
          <Link to="/event" className="nav-link">
            <span className="nav-link-text">Events</span>
          </Link>
          <Link to="/signup" className="sign-up-btn">
            Sign Up
          </Link>
        </nav>

        {/* Right Section */}
        <div className="header-actions">
          <button className="icon-button">
            <Search className="action-icon" />
          </button>
          <Link to="/user/wallet" className="icon-button">
            <User className="action-icon" />
          </Link>
          
          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="icon-button logout-button"
            title="Logout"
          >
            <LogOut className="action-icon" />
          </button>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-button"
          >
            {mobileMenuOpen ? (
              <X className="menu-icon" />
            ) : (
              <Menu className="menu-icon" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-nav">
            <Link 
              to="/" 
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Home</span>
            </Link>
            <Link 
              to="/shoplist" 
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Shops</span>
            </Link>
            <Link 
              to="/deals" 
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Deals</span>
            </Link>
            <Link 
              to="/event" 
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Events</span>
            </Link>
            <Link 
              to="/signup" 
              className="mobile-sign-up"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
            <button 
              onClick={handleLogout}
              className="mobile-nav-link logout-mobile"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
