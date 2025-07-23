//
// MySQL connection utility using dotenv and connection pooling
//
const mysql = require('mysql2/promise');
require('dotenv').config();

// PUBLIC_INTERFACE
/**
 * Establishes and exports a single MySQL connection pool instance for use throughout the app.
 *
 * Environment variables used:
 *   - MYSQL_HOST
 *   - MYSQL_PORT
 *   - MYSQL_USER
 *   - MYSQL_PASSWORD
 *   - MYSQL_DATABASE
 *
 * @returns {Pool} The mysql2 connection pool object.
 */
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT || 5001, // fallback to 5001 if not set
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
