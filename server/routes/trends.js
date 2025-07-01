const express = require('express');
const router = express.Router();
const getTrendingTopics = require('../utils/trends');

router.get('/', async (req, res) => {
  try {
    const topics = await getTrendingTopics();
    res.json({ topics });
  } catch (err) {
    console.error('Route error:', err);
    res.status(500).json({ error: 'Failed to load trending topics' });
  }
});

module.exports = router;
