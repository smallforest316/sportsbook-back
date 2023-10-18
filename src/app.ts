// src/app.ts
import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';

const dbConfig = require('../package.json').dbConfig;

const app = express();
const port = 3001;

const pool = new Pool({
  user: dbConfig.db_user,
  host: dbConfig.db_host,
  database: dbConfig.db_name,
  password: dbConfig.db_pwd,
  port: dbConfig.db_port,
});

pool.query(`
  DROP TABLE IF EXISTS sports_events;
  CREATE TABLE sports_events (
    event_id SERIAL PRIMARY KEY,
    event_name VARCHAR(255),
    odds DECIMAL
  );
`);

const sampleData = [
  { id: 1, name: 'Soccer: Team A vs. Team B', odds: 45},
  { id: 2, name: 'Horse Racing: Team C vs. Team B', odds: 26.3},
  { id: 3, name: 'Basketball: Team A vs. Team D', odds: 13},
  { id: 4, name: 'Tennis: Team E vs. Team D', odds: 23.5},
  { id: 5, name: 'Soccer: Team A vs. Team C', odds: 17.2},
];

sampleData.forEach((data) => {
  const query = 'INSERT INTO sports_events (event_id, event_name, odds) VALUES ($1, $2, $3)';
  const values = [data.id, data.name, data.odds];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Inserted record with name: ${data.name, data.id}`);
    }
  });
});

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true, 
}));
app.get('/api/events', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM sports_events');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching events', error);
    res.status(500).json({ error: 'Error fetching events' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
