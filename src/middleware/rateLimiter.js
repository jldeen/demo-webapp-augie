const rateLimit = require('express-rate-limit');

const WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 60000;
const MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100;
const AUTH_MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_AUTH_MAX, 10) || 1000;

/**
 * Rate limiter for unauthenticated requests
 * 100 requests per minute per IP
 */
const publicLimiter = rateLimit({
  windowMs: WINDOW_MS,
  max: MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later' },
  keyGenerator: (req) => req.ip
});

/**
 * Rate limiter for authenticated requests
 * 1000 requests per minute per user
 */
const authLimiter = rateLimit({
  windowMs: WINDOW_MS,
  max: AUTH_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Rate limit exceeded' },
  keyGenerator: (req) => req.user?.id || req.ip
});

module.exports = { publicLimiter, authLimiter };
