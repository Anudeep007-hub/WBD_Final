const jwt = require('jsonwebtoken');

// Example middleware function
// const authenticateToken = (req, res, next) => {
//     const token = req.headers['Authorization']?.split(' ')[1];
//     if (!token) return res.sendStatus(401); // No token provided
  
//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//       if (err) return res.sendStatus(403); // Invalid token
//       req.user = user; // Attach user info to request
//       next();
//     });
//   };

// Middleware to authenticate token
// Middleware for protecting routes (same as the one you used)
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token is not valid' });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;



  