const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const { isEnabled, getFlagValue } = require('../flags');

// GET /api/flags — list all feature flags and their status
router.get('/', (req, res) => {
  const env = process.env.NODE_ENV || 'development';
  const flagFile = path.join(__dirname, '..', 'flags', `flags.${env}.json`);
  const defaultFile = path.join(__dirname, '..', 'flags', 'flags.default.json');

  let flags;
  try {
    flags = JSON.parse(fs.readFileSync(fs.existsSync(flagFile) ? flagFile : defaultFile, 'utf-8'));
  } catch (e) {
    return res.status(500).json({ error: 'Failed to load feature flags' });
  }

  res.json({
    environment: env,
    flags: Object.entries(flags).map(([name, config]) => ({
      name,
      enabled: config.enabled,
      value: config.value,
      description: config.description,
    }))
  });
});

module.exports = router;
