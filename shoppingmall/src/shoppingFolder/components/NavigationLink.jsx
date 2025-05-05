import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NavigationLink = ({ to, children, className }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`section-link ${className}`}
    >
      <Link to={to}>{children}</Link>
    </motion.div>
  );
};

export default NavigationLink;