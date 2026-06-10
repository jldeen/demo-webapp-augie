const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

/**
 * Authentication middleware
 * Validates JWT token and checks against password change timestamp
 */
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if token was issued before password change
    if (decoded.iat && decoded.passwordChangedAt) {
      const changedTimestamp = Math.floor(new Date(decoded.passwordChangedAt).getTime() / 1000);
      if (decoded.iat < changedTimestamp) {
        return res.status(401).json({ error: 'Token expired due to password change' });
      }
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = { authenticate };
