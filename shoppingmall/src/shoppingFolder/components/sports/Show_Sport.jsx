import React, { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, DollarSign, Info, X, Trash, Activity, Users } from "lucide-react";
import BookSlot from "./Booking_Sport";
import "../css/Show_Sport.css";

const Show_Sport = ({ isOwner }) => {
  const get_data_url = `${process.env.REACT_APP_API_URL}/sport/owner/get`;
  const delete_data_url = `${process.env.REACT_APP_API_URL}/sport/owner/delete/`;
  const update_data_url = `${process.env.REACT_APP_API_URL}/sport/owner/update/`;

  const [data, setData] = useState([]);
  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const [selectedSport, setSelectedSport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(get_data_url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsDataAvailable(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    const confirmation = prompt("Type 'delete' to confirm deletion:");
    if (confirmation === "delete") {
      fetch(`${delete_data_url}${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            setData(data.filter((item) => item._id !== id));
            alert("Item deleted successfully.");
          } else {
            alert("Failed to delete the item.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleUpdate = (id) => {
    const itemToUpdate = data.find(item => item._id === id);

    if (!itemToUpdate) {
      alert("Item not found");
      return;
    }

    fetch(`${update_data_url}${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        label: itemToUpdate.label,
        body: itemToUpdate.body,
        cost: itemToUpdate.cost,
        address: itemToUpdate.address,
        contact_mail: itemToUpdate.contact_mail,
        slot_timings: itemToUpdate.slot_timings,
        date: itemToUpdate.date
      })
    })
      .then((res) => {
        if (res.ok) {
          setData(data.map(item =>
            item._id === id ? itemToUpdate : item
          ));
          alert("Item updated successfully.");
        } else {
          alert("Failed to update the item.");
        }
      })
      .catch((err) => {
        console.log("Error has occurred", err);
        alert("Unable to update");
      });
  };

  if (isLoading) {
    return (
      <div className="sports-loading">
        <div className="sports-loading-spinner"></div>
        <p>Loading available sports...</p>
      </div>
    );
  }

  return (
    <div className="show-sport-container">
      <div className="sports-header">
        <h1>Sports & Activities</h1>
        <p>Discover and book exciting sports activities at our mall</p>
      </div>
      
      <div className="sports-grid">
        {isDataAvailable && data.length > 0 ? (
          data.map((item) => (
            <div key={item._id} className="sport-card">
              <div className="sport-card-header">
                <Activity size={24} />
                <div className="sport-tag">Active</div>
              </div>
              <div className="sport-card-content">
                <h3 className="sport-title">{item.label}</h3>
                <p className="sport-description">{item.body.substring(0, 80)}...</p>
                
                <div className="sport-info">
                  <div className="sport-info-item">
                    <MapPin size={16} />
                    <span>{item.address.substring(0, 25)}{item.address.length > 25 ? '...' : ''}</span>
                  </div>
                  <div className="sport-info-item">
                    <DollarSign size={16} />
                    <span>₹{item.cost}</span>
                  </div>
                </div>
                
                <div className="sport-actions">
                  <button 
                    className="view-details-btn"
                    onClick={() => setSelectedSport(item._id)}
                  >
                    Book Now
                  </button>
                  
                  {isOwner && (
                    <button 
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item._id);
                      }}
                    >
                      <Trash size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-sports">
            <Users size={48} />
            <h3>No sports activities available</h3>
            <p>Check back later for exciting sports options</p>
          </div>
        )}
      </div>

      {selectedSport && (
        <div className="sport-dialog-overlay" onClick={() => setSelectedSport(null)}>
          <div className="sport-dialog" onClick={(e) => e.stopPropagation()}>
            {data.filter(item => item._id === selectedSport).map(item => (
              <div key={item._id} className="sport-dialog-content">
                <div className="sport-dialog-header">
                  <div className="sport-dialog-title">
                    <Activity size={24} className="sport-icon" />
                    <h2>{item.label}</h2>
                  </div>
                  <button className="close-dialog-btn" onClick={() => setSelectedSport(null)}>
                    <X size={20} />
                  </button>
                </div>
                
                <div className="sport-detail-info">
                  <div className="sport-detail-description">
                    <h4>About this activity</h4>
                    <p>{item.body}</p>
                  </div>
                  
                  <div className="sport-detail-meta">
                    <div className="meta-item">
                      <MapPin size={18} />
                      <div>
                        <h5>Location</h5>
                        <p>{item.address}</p>
                      </div>
                    </div>
                    
                    <div className="meta-item">
                      <DollarSign size={18} />
                      <div>
                        <h5>Price</h5>
                        <p>₹{item.cost} per session</p>
                      </div>
                    </div>
                    
                    <div className="meta-item">
                      <Info size={18} />
                      <div>
                        <h5>Contact</h5>
                        <p>{item.contact_mail}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="separator"></div>
                
                <div className="booking-section">
                  <h4>Book Your Slot</h4>
                  <BookSlot sportId={item._id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Show_Sport;
