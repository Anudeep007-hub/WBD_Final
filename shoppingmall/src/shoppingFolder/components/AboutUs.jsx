import React from 'react';
import { Building, Users, Info, Sparkles } from 'lucide-react';
import "./css/AboutUs.css";

const AboutUs = () => {
    return (
        <div className="holi-about-container">
            <div className="color-powder-animation">
                {[...Array(20)].map((_, i) => (
                    <div 
                        key={i} 
                        className={`color-powder powder-${i % 5}`} 
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${5 + Math.random() * 10}s`
                        }}
                    />
                ))}
            </div>
            
            <div className="about-content">
                <div className="about-header">
                    <h1>About Us</h1>
                    <Sparkles className="sparkle-icon" size={32} />
                </div>
                
                <div className="about-section">
                    <div className="section-icon">
                        <Building size={32} />
                    </div>
                    <div className="section-text">
                        <h2>Our Mall</h2>
                        <p>
                            Welcome to our Shopping Mall! We are dedicated to providing an exceptional 
                            experience for our visitors. Our mall features a variety of entertainment 
                            options, including exciting games, delightful restaurants, and the latest movies.
                        </p>
                    </div>
                </div>
                
                <div className="about-section">
                    <div className="section-icon">
                        <Info size={32} />
                    </div>
                    <div className="section-text">
                        <h2>Our Mission</h2>
                        <p>
                            Our mission is to create a vibrant community space where families and friends 
                            can come together to enjoy shopping, dining, and entertainment. Whether you're 
                            looking to catch the latest blockbuster, indulge in delicious cuisine, or have 
                            fun with friends, we have something for everyone.
                        </p>
                    </div>
                </div>
                
                <div className="about-section">
                    <div className="section-icon">
                        <Users size={32} />
                    </div>
                    <div className="section-text">
                        <h2>For Mall Owners</h2>
                        <p>
                            For mall owners, we provide an easy-to-use platform to manage listings for 
                            games, restaurants, and movies. Our user-friendly interface allows owners 
                            to quickly add and update their offerings, ensuring that our visitors always 
                            have the best experience possible.
                        </p>
                    </div>
                </div>
                
                <div className="about-footer">
                    <p>
                        Join us in making our shopping mall a premier destination for fun and entertainment. 
                        We look forward to seeing you!
                    </p>
                    <div className="rangoli-pattern"></div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
