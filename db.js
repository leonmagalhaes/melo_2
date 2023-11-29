// db.js
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('intercambio.sqlite');
module.exports = db;
