const express = require('express');
const router = express.Router();

// In-memory store (demo purposes)
const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'user' },
  { id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'user' },
];

// GET /api/users — List all users
router.get('/', (req, res) => {
  res.json({ users, count: users.length });
});

// GET /api/users/:id — Get user by ID
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// POST /api/users — Create a new user
router.post('/', (req, res) => {
  const { name, email, role } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    role: role || 'user',
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

module.exports = router;
