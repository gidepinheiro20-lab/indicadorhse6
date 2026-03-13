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

const storageLegacyTableMap = {
  funcionarios: 'funcionarios',
  empresas: 'empresas',
  'ras-reunioes': 'ras_reunioes',
  ras_reunioes: 'ras_reunioes',
  usuarios: 'usuarios',
  historicoRAS: 'historico_ras',
  historico_ras: 'historico_ras',
  cpts: 'cpts',
  inspecoes: 'inspecoes',
  categoriasHSE: 'categorias_hse',
  categorias_hse: 'categorias_hse',
  'categorias-hse': 'categorias_hse',
  areasLocais: 'areas_locais',
  areas_locais: 'areas_locais',
  tiposRegistro: 'tipos_registro',
  tipos_registro: 'tipos_registro',
  riscosPerigos: 'riscos_perigos',
  riscos_perigos: 'riscos_perigos',
  arts: 'arts'
};

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL não definida. Configure a URL do PostgreSQL do Render para iniciar o servidor.');
  process.exit(1);
}

const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function initializeTables() {
  for (const table of tables) {
    await pgPool.query(`CREATE TABLE IF NOT EXISTS ${table} (
      id SERIAL PRIMARY KEY,
      data JSONB NOT NULL
    )`);
  }

  await pgPool.query(`
    CREATE TABLE IF NOT EXISTS app_storage (
      storage_key TEXT PRIMARY KEY,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

async function getAllRows(table) {
  const result = await pgPool.query(`SELECT id, data FROM ${table} ORDER BY id ASC`);
  return result.rows.map((row) => ({ id: row.id, ...(row.data || {}) }));
}

async function insertRow(table, payload) {
  const result = await pgPool.query(`INSERT INTO ${table} (data) VALUES ($1) RETURNING id`, [payload]);
  return result.rows[0].id;
}

async function updateRow(table, id, payload) {
  await pgPool.query(`UPDATE ${table} SET data = $1 WHERE id = $2`, [payload, id]);
}

async function deleteRow(table, id) {
  await pgPool.query(`DELETE FROM ${table} WHERE id = $1`, [id]);
}

async function setStorageValue(key, value) {
  const serializedValue = JSON.stringify(typeof value === 'undefined' ? null : value);
  await pgPool.query(
    `
      INSERT INTO app_storage (storage_key, data, updated_at)
      VALUES ($1, $2::jsonb, NOW())
      ON CONFLICT (storage_key)
      DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()
    `,
    [key, serializedValue]
  );
}

async function getStorageValue(key) {
  const result = await pgPool.query(`SELECT data FROM app_storage WHERE storage_key = $1`, [key]);
  if (result.rows.length > 0) {
    return { exists: true, data: result.rows[0].data };
  }

  const legacyTable = storageLegacyTableMap[key];
  if (!legacyTable) {
    return { exists: false, data: null };
  }

  const legacyResult = await pgPool.query(`SELECT data FROM ${legacyTable} ORDER BY id ASC`);
  if (legacyResult.rows.length === 0) {
    return { exists: false, data: null };
  }

  const migrated = legacyResult.rows.map((row) => row.data);
  await setStorageValue(key, migrated);
  return { exists: true, data: migrated };
}

app.get('/api/storage/:key', async (req, res) => {
  try {
    const key = String(req.params.key || '').trim();
    if (!key) {
      return res.status(400).json({ error: 'Chave inválida' });
    }

    const value = await getStorageValue(key);
    if (!value.exists) {
      return res.status(404).json({ data: null });
    }

    res.json({ data: value.data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/storage', async (req, res) => {
  try {
    const result = await pgPool.query(`SELECT storage_key, data FROM app_storage ORDER BY storage_key ASC`);
    const payload = {};
    result.rows.forEach((row) => {
      payload[row.storage_key] = row.data;
    });
    res.json(payload);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/storage/:key', async (req, res) => {
  try {
    const key = String(req.params.key || '').trim();
    if (!key) {
      return res.status(400).json({ error: 'Chave inválida' });
    }

    const value = req.body && Object.prototype.hasOwnProperty.call(req.body, 'data')
      ? req.body.data
      : null;

    await setStorageValue(key, value);
    res.json({ message: 'Stored' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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