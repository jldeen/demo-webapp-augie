const express = require('express');
const router = express.Router();

/**
 * @route GET /api/search
 * @query {string} q - Search query
 * @query {number} page - Page number (default: 1)
 * @query {number} limit - Results per page (default: 20, max: 100)
 */
router.get('/', (req, res) => {
  const { q, page = 1, limit = 20 } = req.query;

  if (!q || q.trim().length === 0) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  const sanitizedLimit = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);

  // Simulated search results
  const results = {
    query: q.trim(),
    page: parseInt(page, 10) || 1,
    limit: sanitizedLimit,
    total: 0,
    results: [],
    next_cursor: null
  };

  res.json(results);
});

module.exports = router;
