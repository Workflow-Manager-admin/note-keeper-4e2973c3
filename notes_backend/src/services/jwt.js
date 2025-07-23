/*
 * JWT helper utilities and auth middleware for Express.
 */

const jwt = require('jsonwebtoken');

/**
 * Create a new JWT token for specified user id.
 * @param {Object} payload - User payload (must include user_id)
 * @returns {string} JWT token
 */
// PUBLIC_INTERFACE
function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
}

/**
 * Verify a JWT token and return payload.
 * @param {string} token
 * @returns {Object} Decoded payload
 * @throws
 */
function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

/**
 * Express middleware to require valid JWT.
 * Sets req.user = decoded payload if valid.
 */
// PUBLIC_INTERFACE
function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Missing token' });

  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = {
  signToken,
  verifyToken,
  authenticateJWT
};
