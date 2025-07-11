const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create or open the database
const dbPath = path.join(__dirname, 'studio.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Example: Create a table for token transfers
const createTransfersTable = `
CREATE TABLE IF NOT EXISTS transfers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  from_address TEXT NOT NULL,
  to_address TEXT NOT NULL,
  value TEXT NOT NULL,
  tx_hash TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;

db.run(createTransfersTable, (err) => {
  if (err) {
    console.error('Could not create transfers table', err);
  } else {
    console.log('Transfers table ready');
  }
});

module.exports = db;
