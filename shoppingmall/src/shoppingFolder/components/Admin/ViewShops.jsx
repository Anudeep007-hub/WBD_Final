import React, { useState, useEffect } from 'react';

const ViewShops = () => {
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null); // To store the selected shop for details
  const [isModalOpen, setIsModalOpen] = useState(false); // Toggle modal visibility

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/a/shops`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched shops:', data);
        if (Array.isArray(data)) {
          setShops(data);
        } else {
          console.error('Expected an array but got:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching shops:', error);
      });
  }, []);

  const handleDetailsClick = (shop) => {
    setSelectedShop(shop);
    setIsModalOpen(true); // Open modal with selected shop details
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedShop(null);
  };

  return (
    <div className="shops-list">
      <h1>Stores & Restaurants</h1>
      {shops.length === 0 ? (
        <p>No shops available.</p>
      ) : (
        shops.map(shop => (
          <div key={shop._id} className="shop-item">
            <div className="shop-info">
              <h2>{shop.name}</h2>
              <p>{shop.location}</p>
              {shop.contact && <p>Contact: {shop.contact}</p>}
              <button onClick={() => handleDetailsClick(shop)}>Details</button>
            </div>
          </div>
        ))
      )}

      {/* Modal for displaying shop details */}
      {isModalOpen && selectedShop && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>×</button>
            <h2>{selectedShop.name}</h2>
            <p><strong>Location:</strong> {selectedShop.location}</p>
            <p><strong>Contact:</strong> {selectedShop.contact}</p>
            <div className="working-hours">
              <h3>Working Hours:</h3>
              <ul>
                {Object.entries(selectedShop.workingHours).map(([day, hours]) => (
                  <li key={day}>
                    <strong>{day.charAt(0).toUpperCase() + day.slice(1)}:</strong> {hours || 'Closed'}
                  </li>
                ))}
              </ul>
            </div>
            <div className="owner-details">
              <h3>Owner Details:</h3>
              <p><strong>Name:</strong> {selectedShop.owner.name}</p>
              <p><strong>Email:</strong> {selectedShop.owner.email}</p>
              <p><strong>Contact:</strong> {selectedShop.owner.contact}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewShops;
