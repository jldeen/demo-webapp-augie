const fs = require('fs');
const path = require('path');

// Feature flags loaded from config file
// In production, this could be backed by LaunchDarkly, Split.io, etc.
let flags = {};

function loadFlags() {
  const env = process.env.NODE_ENV || 'development';
  const flagFile = path.join(__dirname, `flags.${env}.json`);
  const defaultFile = path.join(__dirname, 'flags.default.json');

  try {
    flags = JSON.parse(fs.readFileSync(fs.existsSync(flagFile) ? flagFile : defaultFile, 'utf-8'));
  } catch (e) {
    console.warn('Failed to load feature flags, using defaults');
    flags = {};
  }
}

function isEnabled(flagName, defaultValue = false) {
  return flags[flagName]?.enabled ?? defaultValue;
}

function getFlagValue(flagName, defaultValue = null) {
  return flags[flagName]?.value ?? defaultValue;
}

loadFlags();

module.exports = { isEnabled, getFlagValue, loadFlags };
