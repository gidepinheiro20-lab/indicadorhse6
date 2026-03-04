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

const memoryStore = new Map();
const pgPool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    })
  : null;

if (!pgPool) {
  tables.forEach(table => {
    memoryStore.set(table, []);
  });
  console.warn('DATABASE_URL não definida. Usando armazenamento em memória.');
}

async function initializeTables() {
  if (!pgPool) {
    return;
  }

  for (const table of tables) {
    await pgPool.query(`CREATE TABLE IF NOT EXISTS ${table} (
      id SERIAL PRIMARY KEY,
      data JSONB NOT NULL
    )`);
  }
}

async function getAllRows(table) {
  if (pgPool) {
    const result = await pgPool.query(`SELECT id, data FROM ${table} ORDER BY id ASC`);
    return result.rows.map((row) => ({ id: row.id, ...(row.data || {}) }));
  }

  return memoryStore.get(table) || [];
}

async function insertRow(table, payload) {
  if (pgPool) {
    const result = await pgPool.query(`INSERT INTO ${table} (data) VALUES ($1) RETURNING id`, [payload]);
    return result.rows[0].id;
  }

  const rows = memoryStore.get(table) || [];
  const nextId = rows.length ? Math.max(...rows.map((row) => row.id)) + 1 : 1;
  rows.push({ id: nextId, ...payload });
  memoryStore.set(table, rows);
  return nextId;
}

async function updateRow(table, id, payload) {
  if (pgPool) {
    await pgPool.query(`UPDATE ${table} SET data = $1 WHERE id = $2`, [payload, id]);
    return;
  }

  const rows = memoryStore.get(table) || [];
  const index = rows.findIndex((row) => row.id === Number(id));
  if (index >= 0) {
    rows[index] = { id: Number(id), ...payload };
    memoryStore.set(table, rows);
  }
}

async function deleteRow(table, id) {
  if (pgPool) {
    await pgPool.query(`DELETE FROM ${table} WHERE id = $1`, [id]);
    return;
  }

  const rows = memoryStore.get(table) || [];
  const filtered = rows.filter((row) => row.id !== Number(id));
  memoryStore.set(table, filtered);
}

tables.forEach(table => {
  // GET all
  app.get(`/api/${table}`, async (req, res) => {
    try {
      const rows = await getAllRows(table);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST (insert)
  app.post(`/api/${table}`, async (req, res) => {
    try {
      const id = await insertRow(table, req.body || {});
      res.json({ id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // PUT (update)
  app.put(`/api/${table}/:id`, async (req, res) => {
    try {
      const { id } = req.params;
      await updateRow(table, id, req.body || {});
      res.json({ message: 'Updated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // DELETE
  app.delete(`/api/${table}/:id`, async (req, res) => {
    try {
      const { id } = req.params;
      await deleteRow(table, id);
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
});

initializeTables()
  .then(() => {
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server running on http://0.0.0.0:${port}`);
    });
  })
  .catch((error) => {
    console.error('Falha ao inicializar banco de dados:', error.message);
    process.exit(1);
  });