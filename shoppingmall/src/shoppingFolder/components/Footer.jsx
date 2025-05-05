import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import '../components/css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section about">
          <h2 className="footer-logo">Shopping Mall C</h2>
          <p className="footer-desc">Your one-stop destination for shopping, dining, and entertainment experiences in a vibrant atmosphere.</p>
          <div className="contact-info">
            <div className="contact-item">
              <Phone size={16} />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="contact-item">
              <Mail size={16} />
              <span>contact@shoppingMallC.com</span>
            </div>
            <div className="contact-item">
              <MapPin size={16} />
              <span>123 Shopping Avenue, Retail City</span>
            </div>
          </div>
        </div>

        <div className="footer-section links">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shoplist">Shops</Link></li>
            <li><Link to="/deals">Deals</Link></li>
            <li><Link to="/event">Events</Link></li>
            <li><Link to="/AboutUs">About Us</Link></li>
            <li><Link to="/FAQ">FAQ</Link></li>
          </ul>
        </div>

        <div className="footer-section services">
          <h3 className="footer-heading">Services</h3>
          <ul className="footer-nav">
            <li><Link to="/bookrestaurant">Restaurant Booking</Link></li>
            <li><a href="https://theatre-d217.onrender.com/" target="_blank" rel="noopener noreferrer">Movie Tickets</a></li>
            <li><Link to="/booksports">Sports & Games</Link></li>
            <li><Link to="/feedback">Customer Feedback</Link></li>
            <li><Link to="/membership">Membership</Link></li>
            <li><Link to="/careers">Careers</Link></li>
          </ul>
        </div>

        <div className="footer-section newsletter">
          <h3 className="footer-heading">Stay Updated</h3>
          <p>Subscribe to get the latest news and special offers.</p>
          <div className="subscribe-form">
            <input type="email" placeholder="Your Email Address" />
            <button type="submit">Subscribe</button>
          </div>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link facebook">
              <Facebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link twitter">
              <Twitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link instagram">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Colorful Mall. All Rights Reserved.</p>
        <div className="footer-legal">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
          <Link to="/sitemap">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
