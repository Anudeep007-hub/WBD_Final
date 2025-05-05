import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BookingCard = ({ title, description, buttonText, onClick, to }) => {
  const ButtonComponent = to ? Link : motion.button;
  const buttonProps = to ? { to } : { onClick };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="booking-card"
    >
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {description}
      </motion.p>
      <ButtonComponent
        {...buttonProps}
        className="book-now-btn"
        whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {buttonText}
      </ButtonComponent>
    </motion.div>
  );
};

export default BookingCard;