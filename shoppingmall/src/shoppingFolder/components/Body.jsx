import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Calendar, Film, Utensils, Gamepad } from 'lucide-react';
import './css/Body.css';

const Body = () => {
  const navigate = useNavigate();

  const handleBookNowClick = () => {
    window.open("https://theatre-d217.onrender.com/", "_blank"); // Open the link in a new tab
  };

  return (
    <div className="mall-body">
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-content">
          <h1>Welcome to Our Shopping Mall</h1>
          <p>Experience shopping in a whole new colorful way</p>
          <button className="explore-btn" onClick={() => navigate('/shoplist')}>
            Explore Shops <ShoppingBag size={16} />
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="navigation-row">
        <div className="section-link home">
          <a href="/">Home</a>
        </div>
        <div className="section-link shops">
          <a href="shoplist">Shops</a>
        </div>
        <div className="section-link deals">
          <a href="deals">Deals</a>
        </div>
        <div className="section-link events">
          <a href="event">Events</a>
        </div>
      </div>

      {/* Feature Section */}
      <div className="feature-section">
        <div className="feature-card">
          <div className="feature-icon shopping"></div>
          <h3>Premium Shopping</h3>
          <p>Discover exclusive brands and the latest fashion trends</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon dining"></div>
          <h3>Gourmet Dining</h3>
          <p>Experience culinary delights from around the world</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon entertainment"></div>
          <h3>Entertainment</h3>
          <p>Movies, games, and events for the whole family</p>
        </div>
      </div>

      {/* Booking section */}
      <div className="booking-section">
        <h2 className="wow-heading">Book Your Experience</h2>
        <div className="booking-options">
          <div className="booking-card restaurant">
            <div className="booking-icon">
              <Utensils size={32} />
            </div>
            <h3>Book a Restaurant</h3>
            <p>Find and reserve a table at your favorite restaurant.</p>
            <button 
              className="book-now-btn" 
              onClick={() => navigate('/bookrestaurant')}
            >
              Book Now
            </button>
          </div>
          
          <div className="booking-card movie">
            <div className="booking-icon">
              <Film size={32} />
            </div>
            <h3>Book a Movie</h3>
            <p>Watch the latest movies in our state-of-the-art cinema.</p>
            <button
              className="book-now-btn"
              onClick={handleBookNowClick}
            >
              Book Now
            </button>
          </div>

          <div className="booking-card game">
            <div className="booking-icon">
              <Gamepad size={32} />
            </div>
            <h3>Book a Game</h3>
            <p>Find and enjoy your game to the fullest.</p>
            <button 
              className="book-now-btn" 
              onClick={() => navigate('/booksports')}
            >
              Book Now
            </button>
          </div>
          
          <div className="booking-card event">
            <div className="booking-icon">
              <Calendar size={32} />
            </div>
            <h3>Book For an Event</h3>
            <p>Grab your Tickets for an event</p>
            <button 
              className="book-now-btn"
              onClick={() => navigate('/event')}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
