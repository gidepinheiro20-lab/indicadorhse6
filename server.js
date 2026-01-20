const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve arquivos estáticos (index.html, etc)
app.use(express.static('.'));

// API endpoints for each table
const tables = ['funcionarios', 'empresas', 'ras_reunioes', 'usuarios', 'historico_ras', 'cpts', 'inspecoes', 'categorias_hse', 'areas_locais', 'tipos_registro', 'riscos_perigos', 'arts'];

// PostgreSQL database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Initialize tables
const initDB = async () => {
  const client = await pool.connect();
  try {
    for (const table of tables) {
      await client.query(`
        CREATE TABLE IF NOT EXISTS ${table} (
          id SERIAL PRIMARY KEY,
          data JSONB
        )
      `);
    }
    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    client.release();
  }
};

initDB();


tables.forEach(table => {
  // GET all
  app.get(`/api/${table}`, async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM ${table}`);
      res.json(result.rows.map(row => ({ id: row.id, ...row.data })));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST (insert)
  app.post(`/api/${table}`, async (req, res) => {
    try {
      const data = req.body;
      const result = await pool.query(
        `INSERT INTO ${table} (data) VALUES ($1) RETURNING id`,
        [data]
      );
      res.json({ id: result.rows[0].id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // PUT (update)
  app.put(`/api/${table}/:id`, async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      await pool.query(
        `UPDATE ${table} SET data = $1 WHERE id = $2`,
        [data, id]
      );
      res.json({ message: 'Updated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // DELETE
  app.delete(`/api/${table}/:id`, async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query(`DELETE FROM ${table} WHERE id = $1`, [id]);
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});