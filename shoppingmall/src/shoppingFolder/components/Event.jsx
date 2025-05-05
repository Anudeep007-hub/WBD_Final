import React, { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, Info } from 'lucide-react';
import './css/Events.css';

function Event() {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [openEvent, setOpenEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/events`);
        if (response.ok) {
          const data = await response.json();
          setEventsData(data);
          setError(false);
        } else {
          console.error('Failed to fetch events');
          setError(true);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    try {
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
      return dateString;
    }
  };

  const closeEventDetails = () => {
    setOpenEvent(null);
    document.body.style.overflow = 'auto';
  };

  const showEventDetails = (event) => {
    setOpenEvent(event);
    document.body.style.overflow = 'hidden';
  };

  return (
    <div className="events-container">
      <div className="events-header">
        <h1>Upcoming Mall Events</h1>
        <p className="events-subtitle">Join us for exciting events and experiences</p>
      </div>

      {loading ? (
        <div className="events-loading">
          {[1, 2, 3].map((item) => (
            <div key={item} className="event-skeleton">
              <div className="skeleton-image"></div>
              <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-meta"></div>
                <div className="skeleton-meta"></div>
                <div className="skeleton-description"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="events-error">
          <Info size={48} />
          <h3>Unable to load events</h3>
          <p>Please check back later</p>
        </div>
      ) : eventsData.length === 0 ? (
        <div className="events-empty">
          <Calendar size={48} />
          <h3>No upcoming events</h3>
          <p>Check back soon for exciting mall events</p>
        </div>
      ) : (
        <div className="events-scroll-area">
          <div className="events-list">
            {eventsData.map(event => (
              <div key={event._id} className="event-card">
                <div className="event-image-container">
                  <img 
                    src={event.image} 
                    alt={event.name} 
                    className="event-image" 
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1170&auto=format&fit=crop';
                    }}
                  />
                  {event.category && (
                    <span className="event-category">{event.category}</span>
                  )}
                </div>
                <div className="event-info">
                  <h2 className="event-title">{event.name}</h2>
                  <div className="event-meta">
                    <div className="event-meta-item">
                      <Calendar size={16} />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="event-meta-item">
                      <Clock size={16} />
                      <span>{event.time}</span>
                    </div>
                    {event.location && (
                      <div className="event-meta-item">
                        <MapPin size={16} />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                  <p className="event-description">{event.description.length > 100 
                    ? `${event.description.substring(0, 100)}...` 
                    : event.description}
                  </p>
                  <button 
                    className="event-button" 
                    onClick={() => showEventDetails(event)}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {openEvent && (
        <div className="event-modal-backdrop" onClick={closeEventDetails}>
          <div className="event-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="event-modal-header">
              <h2>{openEvent.name}</h2>
              <div className="event-modal-meta">
                <span><Calendar size={14} /> {formatDate(openEvent.date)}</span>
                <span><Clock size={14} /> {openEvent.time}</span>
                {openEvent.location && <span><MapPin size={14} /> {openEvent.location}</span>}
              </div>
              <button className="event-modal-close" onClick={closeEventDetails}>×</button>
            </div>
            
            <div className="event-modal-image-container">
              <img 
                src={openEvent.image} 
                alt={openEvent.name} 
                className="event-modal-image" 
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1170&auto=format&fit=crop';
                }}
              />
              {openEvent.category && (
                <span className="event-modal-category">{openEvent.category}</span>
              )}
            </div>
            
            <div className="event-modal-description-container">
              <p className="event-modal-description">{openEvent.description}</p>
              {openEvent.additionalInfo && (
                <div className="event-modal-additional-info">
                  <h4>Additional Information</h4>
                  <p>{openEvent.additionalInfo}</p>
                </div>
              )}
            </div>
            
            <div className="event-modal-footer">
              {openEvent.registrationLink ? (
                <a 
                  href={openEvent.registrationLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="event-modal-register-button"
                >
                  Register Now
                </a>
              ) : (
                <button 
                  className="event-modal-close-button"
                  onClick={closeEventDetails}
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Event;
