const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const authenticateUser = require('./middleware/authenticateUser');
const cardRoutes = require('./routes/cards');

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Connect database (available via pool)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Make pool available to routes via req.pool
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

// Routes
app.use('/api/cards', cardRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
