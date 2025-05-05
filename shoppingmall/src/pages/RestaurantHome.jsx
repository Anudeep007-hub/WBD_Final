import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/css/home.css';

function Home() {
  useEffect(() => {
    // Optional: You can add more dynamic animations here if needed
    const addRandomColorSplash = () => {
      const container = document.querySelector('.holi-home-container');
      if (container) {
        const splash = document.createElement('div');
        splash.className = 'color-splash';
        
        // Random position
        splash.style.top = `${Math.random() * 100}%`;
        splash.style.left = `${Math.random() * 100}%`;
        
        // Random size between 20px and 60px
        const size = 20 + Math.random() * 40;
        splash.style.width = `${size}px`;
        splash.style.height = `${size}px`;
        
        // Random color
        const colors = ['#FF9A9E', '#FECDA6', '#A0FFA3', '#D4A5FF', '#9BE8D8', '#FFC0CB'];
        splash.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Add to DOM
        container.appendChild(splash);
        
        // Remove after animation
        setTimeout(() => {
          splash.remove();
        }, 6000);
      }
    };

    // Add new color splash every 2 seconds
    const intervalId = setInterval(addRandomColorSplash, 2000);
    
    // Cleanup
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="holi-home-container">
      {/* Static color splashes */}
      <div className="color-splash splash-1"></div>
      <div className="color-splash splash-2"></div>
      <div className="color-splash splash-3"></div>
      <div className="color-splash splash-4"></div>
      <div className="color-splash splash-5"></div>
      
      {/* Decorative elements */}
      <div className="festival-decoration decoration-top"></div>
      <div className="festival-decoration decoration-bottom"></div>
      
      <div className="holi-content">
        <h1 className="holi-heading">Celebrate Food & Festivals</h1>
        <p className="holi-subheading">Experience the joy of dining amidst the colors of celebration!</p>
        <Link to="/bookrestaurant/restaurants" className="holi-browse-link">
          Discover Restaurants
        </Link>
      </div>
    </div>
  );
}

export default Home;
