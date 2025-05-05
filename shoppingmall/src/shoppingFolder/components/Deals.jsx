import React, { useState, useEffect } from 'react';
import { Calendar, Tag, Clock, ShoppingBag, Search, Filter } from 'lucide-react';
import './css/Deals.css';

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/deals`);
        const data = await response.json();
        setDeals(data);
        setFilteredDeals(data);
        
        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(data.map(deal => deal.category || 'Uncategorized'))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching deals:', error);
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  useEffect(() => {
    // Filter deals based on search term and category
    let results = deals;
    
    if (searchTerm) {
      results = results.filter(deal => 
        deal.shop.toLowerCase().includes(searchTerm.toLowerCase()) || 
        deal.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'All') {
      results = results.filter(deal => deal.category === selectedCategory);
    }
    
    setFilteredDeals(results);
  }, [searchTerm, selectedCategory, deals]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateDaysRemaining = (expirationDate) => {
    const now = new Date();
    const expDate = new Date(expirationDate);
    const diffTime = expDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="deals-page">
      <div className="deals-header">
        <h1>Special Offers & Deals</h1>
        <p>Discover the best promotions and discounts from your favorite stores</p>
      </div>
      
      <div className="deals-controls">
        <div className="search-bar">
          <Search size={20} />
          <input 
            type="text" 
            placeholder="Search for deals..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-categories">
          <Filter size={16} />
          <span>Filter by:</span>
          <div className="category-pills">
            {categories.map(category => (
              <button 
                key={category} 
                className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="loading-deals">
          <div className="loading-spinner"></div>
          <p>Loading amazing deals...</p>
        </div>
      ) : (
        <div className="deals-container">
          {filteredDeals.length > 0 ? (
            filteredDeals.map((deal) => {
              const daysRemaining = calculateDaysRemaining(deal.expiration);
              const isExpiringSoon = daysRemaining <= 3 && daysRemaining > 0;
              const isExpired = daysRemaining === 0;
              
              return (
                <div key={deal._id} className={`deal-card ${isExpiringSoon ? 'expiring-soon' : ''} ${isExpired ? 'expired' : ''}`}>
                  <div className="deal-ribbon">
                    {isExpired ? 'Expired' : isExpiringSoon ? 'Ending Soon!' : 'Active Deal'}
                  </div>
                  
                  <div className="deal-shop">
                    <ShoppingBag size={18} />
                    <span>{deal.shop}</span>
                    {deal.category && <div className="deal-category">{deal.category}</div>}
                  </div>
                  
                  <div className="deal-image">
                    {deal.image ? (
                      <img src={deal.image} alt={deal.shop} />
                    ) : (
                      <div className="placeholder-image">
                        <Tag size={40} />
                      </div>
                    )}
                  </div>
                  
                  <div className="deal-details">
                    <h3>{deal.title || 'Special Offer'}</h3>
                    <p className="deal-description">{deal.description}</p>
                    
                    <div className="deal-meta">
                      <div className="expiration">
                        <Calendar size={16} />
                        <span>Expires: {formatDate(deal.expiration)}</span>
                      </div>
                      
                      <div className="countdown">
                        <Clock size={16} />
                        <span>{isExpired ? 'Deal ended' : `${daysRemaining} days left`}</span>
                      </div>
                    </div>
                    
                    {!isExpired && (
                      <button className="claim-deal-btn">
                        {deal.couponCode ? `Use Code: ${deal.couponCode}` : 'Claim Deal'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-deals">
              <Tag size={60} />
              <h3>No deals found</h3>
              <p>
                {searchTerm || selectedCategory !== 'All'
                  ? 'Try adjusting your search or filters'
                  : 'No deals available at the moment. Check back soon!'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Deals;
