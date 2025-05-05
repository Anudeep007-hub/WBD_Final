import React from "react";
import "./css/infinitescroller.css";

const InfiniteScroll = ({ offers }) => {
  return (
    <div className="RS-scroll-container">
      <div className="RS-scroll-content">
        {/* Render offers twice to simulate infinite scrolling */}
        {offers.map((offer, index) => (
          <span key={`offer-${index}`} className="RS-offer-item">
            {offer}
          </span>
        ))}
        {offers.map((offer, index) => (
          <span key={`offer-duplicate-${index}`} className="RS-offer-item">
            {offer}
          </span>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScroll;
