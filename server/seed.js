const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'users.db');
const db = new sqlite3.Database(DB_PATH);

const adminEmail = 'admin@example.com';
const adminPassword = 'AdminPass123';
const adminName = 'Administrator';

const hashed = bcrypt.hashSync(adminPassword, 8);

db.serialize(() => {
  db.get('SELECT id FROM users WHERE email = ?', [adminEmail], (err, row) => {
    if (err) {
      console.error('DB error:', err);
      process.exit(1);
    }
    if (row) {
      db.run('UPDATE users SET name = ?, password = ? WHERE email = ?', [adminName, hashed, adminEmail], function (uerr) {
        if (uerr) console.error('Update error:', uerr);
        else console.log('Updated admin user:', adminEmail);
        process.exit(0);
      });
    } else {
      db.run('INSERT INTO users (name, email, password, skills) VALUES (?, ?, ?, ?)', [adminName, adminEmail, hashed, JSON.stringify([])], function (ierr) {
        if (ierr) console.error('Insert error:', ierr);
        else console.log('Inserted admin user:', adminEmail);
        process.exit(0);
      });
    }
  });
});
