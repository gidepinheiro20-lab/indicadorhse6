const express = require('express');
const fs = require('fs');
const path = require('path');
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

// JSON file storage
const DB_FILE = './database.json';

// Initialize database
if (!fs.existsSync(DB_FILE)) {
  const initialData = {};
  tables.forEach(table => {
    initialData[table] = [];
  });
  fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
}

// Helper functions
function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

tables.forEach(table => {
  // GET all
  app.get(`/api/${table}`, (req, res) => {
    try {
      const stmt = db.prepare(`SELECT * FROM ${table}`);
      const rows = stmt.all();
      res.json(rows.map(row => ({ id: row.id, ...JSON.parse(row.data) })));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST (insert)
  app.post(`/api/${table}`, (req, res) => {
    try {
      const data = JSON.stringify(req.body);
      const stmt = db.prepare(`INSERT INTO ${table} (data) VALUES (?)`);
      const result = stmt.run(data);
      res.json({ id: result.lastInsertRowid });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // PUT (update)
  app.put(`/api/${table}/:id`, (req, res) => {
    try {
      const { id } = req.params;
      const data = JSON.stringify(req.body);
      const stmt = db.prepare(`UPDATE ${table} SET data = ? WHERE id = ?`);
      stmt.run(data, id);
      res.json({ message: 'Updated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // DELETE
  app.delete(`/api/${table}/:id`, (req, res) => {
    try {
      const { id } = req.params;
      const stmt = db.prepare(`DELETE FROM ${table} WHERE id = ?`);
      stmt.run(id);
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});