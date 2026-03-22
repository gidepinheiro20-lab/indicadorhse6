const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  if (
    req.path === '/' ||
    req.path.endsWith('.html') ||
    req.path.endsWith('.js')
  ) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
  }
  next();
});

// Serve arquivos estáticos (index.html, etc)
app.use(express.static('.'));

// API endpoints for each table
const tables = [
  'funcionarios',
  'empresas',
  'ras_reunioes',
  'usuarios',
  'historico_ras',
  'cpts',
  'inspecoes',
  'categorias_hse',
  'areas_locais',
  'tipos_registro',
  'riscos_perigos',
  'arts',
  'frequencias',
  'categorias',
  'riscos'
];

const tableAliases = {
  'categorias-hse': 'categorias_hse',
  'areasLocais': 'areas_locais',
  'tiposRegistro': 'tipos_registro',
  'riscosPerigos': 'riscos_perigos'
};

function resolveTableName(name) {
  if (tables.includes(name)) return name;
  return tableAliases[name] || null;
}

const accessControlledTables = new Set([
  'funcionarios',
  'empresas',
  'ras_reunioes',
  'historico_ras',
  'cpts',
  'inspecoes',
  'categorias_hse',
  'areas_locais',
  'tipos_registro',
  'riscos_perigos',
  'arts',
  'frequencias',
  'categorias',
  'riscos'
]);

function getRequestUser(req) {
  const login = (req.header('x-user-login') || '').trim();
  const perfil = (req.header('x-user-perfil') || '').trim();
  if (!login) return null;
  return { login, perfil };
}

function isAdmin(user) {
  return !!(user && String(user.perfil).toLowerCase() === 'administrador');
}

function applyReadFilter(table, rows, user) {
  if (!accessControlledTables.has(table)) return rows;
  if (!user) return rows;
  if (isAdmin(user)) return rows;

  return rows.filter((row) => {
    const ownerLogin = row && row._ownerLogin ? String(row._ownerLogin).toLowerCase() : '';
    return !ownerLogin || ownerLogin === String(user.login).toLowerCase();
  });
}

function applyOwnerOnWrite(table, payload, user) {
  if (!accessControlledTables.has(table)) return payload;
  if (!user) return payload;
  if (!payload || typeof payload !== 'object') return payload;

  const normalized = { ...payload };
  if (!normalized._ownerLogin) normalized._ownerLogin = user.login;
  if (!normalized._ownerPerfil) normalized._ownerPerfil = user.perfil || '';
  return normalized;
}

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
    const payloadId = payload && payload.id != null ? String(payload.id) : null;
    if (payloadId) {
      const existing = await pgPool.query(
        `SELECT id FROM ${table} WHERE data->>'id' = $1 LIMIT 1`,
        [payloadId]
      );
      if (existing.rows.length > 0) {
        const dbId = existing.rows[0].id;
        await pgPool.query(`UPDATE ${table} SET data = $1 WHERE id = $2`, [payload, dbId]);
        return dbId;
      }
    }

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

// Rotas da API com suporte a aliases de tabela
app.get('/api/:table', async (req, res) => {
  try {
    const table = resolveTableName(req.params.table);
    if (!table) return res.status(404).json({ error: 'Tabela não encontrada' });
    const user = getRequestUser(req);
    const rows = await getAllRows(table);
    res.json(applyReadFilter(table, rows, user));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/:table', async (req, res) => {
  try {
    const table = resolveTableName(req.params.table);
    if (!table) return res.status(404).json({ error: 'Tabela não encontrada' });
    const user = getRequestUser(req);
    const payload = applyOwnerOnWrite(table, req.body || {}, user);
    const id = await insertRow(table, payload);
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/:table/:id', async (req, res) => {
  try {
    const table = resolveTableName(req.params.table);
    if (!table) return res.status(404).json({ error: 'Tabela não encontrada' });
    const { id } = req.params;
    await updateRow(table, id, req.body || {});
    res.json({ message: 'Updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/:table/:id', async (req, res) => {
  try {
    const table = resolveTableName(req.params.table);
    if (!table) return res.status(404).json({ error: 'Tabela não encontrada' });
    const { id } = req.params;
    await deleteRow(table, id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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