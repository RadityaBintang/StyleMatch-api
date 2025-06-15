require('dotenv').config(); 
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;


console.log('DEBUG (auth.js): SECRET_KEY loaded:', secretKey ? 'Loaded (Length: ' + secretKey.length + ')' : 'NOT LOADED or EMPTY');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  
  console.log('DEBUG (auth.js): Token received in Authorization header:', token ? 'Present' : 'Missing');

  if (!token) {
   
    console.warn('WARNING (auth.js): Access token is missing. Rejecting with 401.');
    return res.status(401).json({ message: 'Access token is missing' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {

      console.error('ERROR (auth.js): Token verification failed:', err); 
      
      let errorMessage = 'Invalid or expired token.';
      if (err.name === 'TokenExpiredError') {
        errorMessage = 'Your session has expired. Please log in again.';
      } else if (err.name === 'JsonWebTokenError') {
        errorMessage = 'Invalid token. Possible SECRET_KEY mismatch. Please log in again.';
      }
      
      console.warn(`WARNING (auth.js): Token rejected with 403. Reason: ${errorMessage}`);
      return res.status(403).json({ message: errorMessage });
    }

    req.user = user;
    
    console.log('DEBUG (auth.js): Token successfully verified. User payload:', req.user);
    next();
  });
}

module.exports = { authenticateToken };
