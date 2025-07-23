//
// Service for notes CRUD and queries
//
const pool = require('./db');

/**
 * Create a new note in the DB for a user.
 * @param {number} userId
 * @param {string} title
 * @param {string} content
 * @returns {object} created note
 */
// PUBLIC_INTERFACE
async function createNote(userId, title, content) {
  const [result] = await pool.execute(
    'INSERT INTO notes (user_id, title, content, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
    [userId, title, content]
  );
  return { id: result.insertId, title, content, user_id: userId };
}

/**
 * Get all notes for a user (optionally with query/search)
 * @param {number} userId
 * @param {string} search (optional)
 * @returns {array} list of notes
 */
// PUBLIC_INTERFACE
async function getNotes(userId, search) {
  if (search) {
    const [rows] = await pool.execute(
      `SELECT id, title, content, created_at, updated_at 
       FROM notes
       WHERE user_id=? AND (title LIKE ? OR content LIKE ?)
       ORDER BY updated_at DESC`,
      [userId, `%${search}%`, `%${search}%`]
    );
    return rows;
  }
  const [rows] = await pool.execute(
    'SELECT id, title, content, created_at, updated_at FROM notes WHERE user_id=? ORDER BY updated_at DESC',
    [userId]
  );
  return rows;
}

/**
 * Get a single note (for edit/view)
 * @param {number} userId
 * @param {number} noteId
 */
// PUBLIC_INTERFACE
async function getNoteById(userId, noteId) {
  const [rows] = await pool.execute(
    'SELECT id, title, content, created_at, updated_at FROM notes WHERE id=? AND user_id=?',
    [noteId, userId]
  );
  return rows && rows.length ? rows[0] : null;
}

/**
 * Update note if user owns it.
 */
// PUBLIC_INTERFACE
async function updateNote(userId, noteId, title, content) {
  const [result] = await pool.execute(
    'UPDATE notes SET title=?, content=?, updated_at=NOW() WHERE id=? AND user_id=?',
    [title, content, noteId, userId]
  );
  return result.affectedRows > 0;
}

/**
 * Delete note if user owns it.
 */
// PUBLIC_INTERFACE
async function deleteNote(userId, noteId) {
  const [result] = await pool.execute(
    'DELETE FROM notes WHERE id=? AND user_id=?',
    [noteId, userId]
  );
  return result.affectedRows > 0;
}

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
