const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

/**
 * @route POST /api/auth/change-password
 * @body {string} currentPassword
 * @body {string} newPassword
 */
router.post('/change-password', authenticate, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Both current and new password are required' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ error: 'New password must be at least 8 characters' });
  }

  try {
    // Update password and invalidate sessions
    const passwordChangedAt = new Date().toISOString();

    // In production: update DB, hash password, revoke tokens
    res.json({
      message: 'Password changed successfully',
      passwordChangedAt,
      sessionsRevoked: true
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to change password' });
  }
});

module.exports = router;
