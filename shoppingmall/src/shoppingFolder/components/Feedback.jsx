import { useState } from 'react';
import { Star, Send, Droplets } from 'lucide-react';
import '../components/css/feedback.css'

function Feedback() {
  const [formData, setFormData] = useState({
    username: '',
    rating: 0,
    message: '',
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleStarClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleStarHover = (rating) => {
    setHoverRating(rating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || formData.rating === 0 || !formData.message) {
      alert('All fields are required');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          rating: String(formData.rating)
        }),
      });
  
      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            username: '',
            rating: 0,
            message: '',
          });
        }, 3000);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting feedback.');
    }
  };

  return (
    <div className="holi-feedback-container">
      <div className="color-dots">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className={`color-dot dot-${i % 7}`} 
            style={{left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`}}
          />
        ))}
      </div>
      
      {isSubmitted ? (
        <div className="success-message">
          <div className="success-icon">🎉</div>
          <h2>Thank You!</h2>
          <p>Your feedback has been submitted successfully.</p>
          <div className="holi-colors-animation">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`holi-color color-${i}`} />
            ))}
          </div>
        </div>
      ) : (
        <form className="holi-feedback-form" onSubmit={handleSubmit}>
          <h2 className="form-title">
            <span className="title-text">Share Your Feedback</span>
            <Droplets className="title-icon" size={24} />
          </h2>
          
          <div className="form-group">
            <label htmlFor="username">Your Name</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter your name"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Your Rating</label>
            <div className="star-rating" onMouseLeave={handleStarLeave}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={30}
                  className={`star ${
                    (hoverRating || formData.rating) >= star ? 'star-filled' : ''
                  }`}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleStarHover(star)}
                />
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell us about your experience..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-button">
            <span>Submit Feedback</span>
            <Send size={18} />
          </button>
        </form>
      )}
      
      <div className="holi-decoration">
        <div className="rangoli-pattern" />
      </div>
    </div>
  );
}

export default Feedback;
