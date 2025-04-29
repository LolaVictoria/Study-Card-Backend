const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authenticateUser');

// GET all cards for current user
router.get('/', authenticateUser, async (req, res) => {
  try {
    const { id: user_id } = req.user;
    const pool = req.pool;

    const result = await pool.query(
      'SELECT * FROM cards WHERE user_id = $1',
      [user_id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// POST create a new card
router.post('/', authenticateUser, async (req, res) => {
  try {
    const { question, answer } = req.body;
    const { id: user_id } = req.user;
    const pool = req.pool;

    const result = await pool.query(
      'INSERT INTO cards (question, answer, user_id) VALUES ($1, $2, $3) RETURNING *',
      [question, answer, user_id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
