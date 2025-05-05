import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShops, toggleShopDetails } from  '../../redux/actions/shopActions';
import { motion, AnimatePresence } from 'framer-motion';
import '../components/css/Sholist.css';




function ShopList() {
  const dispatch = useDispatch();
  const { shops, expandedShopId, loading, error } = useSelector(
    (state) => state.shops
  );

  useEffect(() => {
    dispatch(fetchShops());
  }, [dispatch]);

  const handleDetailsClick = (shopId) => {
    dispatch(toggleShopDetails(shopId));
  };

  const colors = [
    'bg-holi-pink',
    'bg-holi-yellow',
    'bg-holi-purple',
    'bg-holi-blue',
    'bg-holi-green',
    'bg-holi-orange',
  ];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading shops...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h3>Error</h3>
          <p>{error}</p>
          <button onClick={() => dispatch(fetchShops())}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="shops-list-container" id="shops">
      <div className="shops-list-header">
        <h1>Stores & Restaurants</h1>
        <p>Explore our curated collection of shops and eateries</p>
      </div>
      
      <div className="shops-list">
        {shops.map((shop, index) => {
          const colorClass = colors[index % colors.length];
          
          return (
            <motion.div 
              key={shop._id} 
              className={`shop-item ${colorClass}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="shop-item-content">
                <div className="shop-info">
                  <h2>{shop.name}</h2>
                  <p className="shop-location">📍 {shop.location}</p>
                  {shop.contact && <p className="shop-contact">📞 {shop.contact}</p>}
                  {shop.owner && (
                    <p className="shop-owner">👤 Owner: {shop.owner.name}</p>
                  )}
                  <button 
                    className={`details-button ${expandedShopId === shop._id ? 'active' : ''}`}
                    onClick={() => handleDetailsClick(shop._id)}
                  >
                    {expandedShopId === shop._id ? 'Less Info' : 'More Info'}
                  </button>
                </div>
                
                <AnimatePresence>
                  {expandedShopId === shop._id && (
                    <motion.div 
                      className="shop-details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>
                        {shop.name} is located in {shop.location}. 
                        {shop.contact && ` You can contact at ${shop.contact}.`}
                      </p>
                      
                      {shop.workingHours && (
                        <div className="working-hours">
                          <h3>Working Hours:</h3>
                          <ul>
                            {shop.workingHours.monday && <li><span>Monday:</span> {shop.workingHours.monday}</li>}
                            {shop.workingHours.tuesday && <li><span>Tuesday:</span> {shop.workingHours.tuesday}</li>}
                            {shop.workingHours.wednesday && <li><span>Wednesday:</span> {shop.workingHours.wednesday}</li>}
                            {shop.workingHours.thursday && <li><span>Thursday:</span> {shop.workingHours.thursday}</li>}
                            {shop.workingHours.friday && <li><span>Friday:</span> {shop.workingHours.friday}</li>}
                            {shop.workingHours.saturday && <li><span>Saturday:</span> {shop.workingHours.saturday}</li>}
                            {shop.workingHours.sunday && <li><span>Sunday:</span> {shop.workingHours.sunday}</li>}
                          </ul>
                        </div>
                      )}
                      
                      {shop.owner && (
                        <div className="owner-details">
                          <h3>Owner Information:</h3>
                          <p><span>Name:</span> {shop.owner.name}</p>
                          <p><span>Contact:</span> {shop.owner.contact}</p>
                          <p><span>Email:</span> {shop.owner.email}</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
        
        {shops.length === 0 && !loading && !error && (
          <div className="no-shops">
            <p>No shops found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShopList;