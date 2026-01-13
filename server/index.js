const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json({ limit: '10mb' }));

const DB_PATH = path.join(__dirname, 'users.db');
const db = new sqlite3.Database(DB_PATH);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      resume TEXT,
      resumeName TEXT,
      skills TEXT
    )
  `);
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });

  const hashed = bcrypt.hashSync(password, 8);
  const stmt = db.prepare(`INSERT INTO users (name, email, password, skills) VALUES (?, ?, ?, ?)`);
  stmt.run(name || '', email, hashed, JSON.stringify([]), function (err) {
    if (err) {
      if (err.code === 'SQLITE_CONSTRAINT') return res.status(409).json({ error: 'Email already registered' });
      return res.status(500).json({ error: 'Database error' });
    }
    const user = { id: this.lastID, name: name || '', email, skills: [], resume: null, resumeName: null };
    res.json({ user });
  });
  stmt.finalize();
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!row) return res.status(404).json({ error: 'User not found' });

    const matches = bcrypt.compareSync(password, row.password);
    if (!matches) return res.status(401).json({ error: 'Invalid credentials' });

    const user = {
      id: row.id,
      name: row.name,
      email: row.email,
      skills: row.skills ? JSON.parse(row.skills) : [],
      resume: row.resume || null,
      resumeName: row.resumeName || null
    };

    res.json({ user });
  });
});

app.post('/api/saveUser', (req, res) => {
  const user = req.body;
  if (!user || !user.email) return res.status(400).json({ error: 'Missing user email' });

  const skills = Array.isArray(user.skills) ? JSON.stringify(user.skills) : JSON.stringify([]);
  const resume = user.resume || null;
  const resumeName = user.resumeName || null;

  const stmt = db.prepare(`UPDATE users SET name = ?, skills = ?, resume = ?, resumeName = ? WHERE email = ?`);
  stmt.run(user.name || '', skills, resume, resumeName, user.email, function (err) {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (this.changes === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ ok: true, updated: this.changes });
  });
  stmt.finalize();
});

app.listen(PORT, () => {
  console.log(`RSR interview server running on http://localhost:${PORT}`);
});
