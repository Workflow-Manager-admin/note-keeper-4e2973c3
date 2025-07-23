//
// Service for user-related database logic (register, login)
//
const pool = require('./db');
const bcrypt = require('bcrypt');

/**
 * Create a new user in the DB.
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @returns {object} created user or throws error
 */
// PUBLIC_INTERFACE
async function createUser(username, email, password) {
  const hashed = await bcrypt.hash(password, 10);
  const [result] = await pool.execute(
    'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
    [username, email, hashed]
  );
  return { id: result.insertId, username, email };
}

/**
 * Look up a user and validate password.
 * @param {string} email
 * @param {string} password
 * @returns {object} user object if valid, else null
 */
// PUBLIC_INTERFACE
async function authenticateUser(email, password) {
  const [rows] = await pool.execute(
    'SELECT id, username, email, password_hash FROM users WHERE email=?',
    [email]
  );
  if (!rows || rows.length === 0) return null;
  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return null;
  // No password in result
  return { id: user.id, username: user.username, email: user.email };
}

/**
 * Look up a user by id (for profile)
 * @param {number} id
 * @returns {object} user or null
 */
// PUBLIC_INTERFACE
async function getUserById(id) {
  const [rows] = await pool.execute('SELECT id, username, email FROM users WHERE id = ?', [id]);
  return rows && rows.length ? rows[0] : null;
}

module.exports = {
  createUser,
  authenticateUser,
  getUserById,
};
