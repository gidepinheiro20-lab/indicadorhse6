const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

// Inicializar pool apenas se DATABASE_URL existir
let pool = null;
let dbAvailable = false;

if (process.env.DATABASE_URL) {
  const { Pool } = require('pg');
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });
  
  pool.on('error', (err) => {
    console.warn('⚠️ Pool error:', err.message);
  });
  
  const initDB = async () => {
    try {
      const client = await pool.connect();
      client.release();
      dbAvailable = true;
      console.log('✅ Database connection successful');
    } catch (err) {
      dbAvailable = false;
      console.warn('⚠️ Database not available, using memory store');
    }
  };
  
  initDB();
}

const tables = ['funcionarios', 'empresas', 'ras_reunioes', 'usuarios', 'historico_ras', 'cpts', 'inspecoes', 'categorias_hse', 'areas_locais', 'tipos_registro', 'riscos_perigos', 'arts', 'checklists'];

// Armazenar dados em memória (fallback)
const dataStore = {};
tables.forEach(table => {
  dataStore[table] = [];
});

// Endpoints da API
tables.forEach(table => {
  // GET all
  app.get(`/api/${table}`, async (req, res) => {
    try {
      if (dbAvailable && pool) {
        const result = await pool.query(`SELECT * FROM ${table}`);
        res.json(result.rows.map(row => ({ id: row.id, ...row.data })));
      } else {
        res.json(dataStore[table]);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST (insert)
  app.post(`/api/${table}`, async (req, res) => {
    try {
      const data = req.body;
      if (dbAvailable && pool) {
        const result = await pool.query(
          `INSERT INTO ${table} (data) VALUES ($1) RETURNING id`,
          [data]
        );
        res.json({ id: result.rows[0].id });
      } else {
        const id = Math.random().toString(36).substr(2, 9);
        dataStore[table].push({ id, ...data });
        res.json({ id });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // PUT (update)
  app.put(`/api/${table}/:id`, async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      if (dbAvailable && pool) {
        await pool.query(
          `UPDATE ${table} SET data = $1 WHERE id = $2`,
          [data, id]
        );
      } else {
        const index = dataStore[table].findIndex(item => item.id == id);
        if (index !== -1) {
          dataStore[table][index] = { id, ...data };
        }
      }
      res.json({ message: 'Updated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // DELETE
  app.delete(`/api/${table}/:id`, async (req, res) => {
    try {
      const { id } = req.params;
      if (dbAvailable && pool) {
        await pool.query(`DELETE FROM ${table} WHERE id = $1`, [id]);
      } else {
        dataStore[table] = dataStore[table].filter(item => item.id != id);
      }
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // DELETE ALL
  app.delete(`/api/${table}`, async (req, res) => {
    try {
      if (dbAvailable && pool) {
        await pool.query(`DELETE FROM ${table}`);
      } else {
        dataStore[table] = [];
      }
      res.json({ message: `All data deleted from ${table}` });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`\n✅ Server running on http://0.0.0.0:${port}`);
  console.log(`📌 Access via http://localhost:${port}`);
  console.log(`🔗 Database: ${dbAvailable ? '✅ Connected' : '⚠️ Using memory store'}\n`);
});
