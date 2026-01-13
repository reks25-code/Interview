const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

/* -------------------- MIDDLEWARE -------------------- */
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json({ limit: '10mb' }));

/* -------------------- DATABASE -------------------- */
const DB_PATH = path.join(__dirname, 'users.db');
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) console.error('Database error:', err.message);
  else console.log('Connected to SQLite database');
});

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

/* -------------------- ROUTES -------------------- */

// Root route (fixes "Cannot GET /")
app.get('/', (req, res) => {
  res.send('RSR Interview Server is running 🚀');
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// Register
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Missing email or password' });

  const hashed = bcrypt.hashSync(password, 8);

  const stmt = db.prepare(
    `INSERT INTO users (name, email, password, skills) VALUES (?, ?, ?, ?)`
  );

  stmt.run(name || '', email, hashed, JSON.stringify([]), function (err) {
    if (err) {
      if (err.code === 'SQLITE_CONSTRAINT')
        return res.status(409).json({ error: 'Email already registered' });
      return res.status(500).json({ error: 'Database error' });
    }

    res.json({
      user: {
        id: this.lastID,
        name: name || '',
        email,
        skills: [],
        resume: null,
        resumeName: null
      }
    });
  });

  stmt.finalize();
});

// Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Missing email or password' });

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!row) return res.status(404).json({ error: 'User not found' });

    const valid = bcrypt.compareSync(password, row.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    res.json({
      user: {
        id: row.id,
        name: row.name,
        email: row.email,
        skills: row.skills ? JSON.parse(row.skills) : [],
        resume: row.resume || null,
        resumeName: row.resumeName || null
      }
    });
  });
});

// Save user profile
app.post('/api/saveUser', (req, res) => {
  const user = req.body;
  if (!user || !user.email)
    return res.status(400).json({ error: 'Missing user email' });

  const skills = Array.isArray(user.skills)
    ? JSON.stringify(user.skills)
    : JSON.stringify([]);

  const stmt = db.prepare(
    `UPDATE users 
     SET name = ?, skills = ?, resume = ?, resumeName = ?
     WHERE email = ?`
  );

  stmt.run(
    user.name || '',
    skills,
    user.resume || null,
    user.resumeName || null,
    user.email,
    function (err) {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (this.changes === 0)
        return res.status(404).json({ error: 'User not found' });

      res.json({ ok: true });
    }
  );

  stmt.finalize();
});

/* -------------------- START SERVER -------------------- */
app.listen(PORT, () => {
  console.log(`RSR Interview Server running at http://localhost:${PORT}`);
});
