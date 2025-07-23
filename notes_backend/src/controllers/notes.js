//
// Controller for notes API endpoints.
//
const notesService = require('../services/notes');

/**
 * Create a new note (requires authentication)
 */
// PUBLIC_INTERFACE
async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });
    const note = await notesService.createNote(req.user.user_id, title, content || '');
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create note', error: err.message });
  }
}

/**
 * Get list of notes optionally filtered by search
 */
async function listNotes(req, res) {
  try {
    const search = req.query.search || '';
    const notes = await notesService.getNotes(req.user.user_id, search);
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to list notes', error: err.message });
  }
}

/**
 * Get single note by id
 */
async function getNote(req, res) {
  try {
    const noteId = parseInt(req.params.id, 10);
    const note = await notesService.getNoteById(req.user.user_id, noteId);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get note', error: err.message });
  }
}

/**
 * Update note if owner
 */
async function updateNote(req, res) {
  try {
    const noteId = parseInt(req.params.id, 10);
    const { title, content } = req.body;
    if (!title) return res.status(400).json({ message: 'Title required' });
    const updated = await notesService.updateNote(req.user.user_id, noteId, title, content || '');
    if (!updated) return res.status(404).json({ message: 'Note not found or not owned by user' });
    res.json({ message: 'Note updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update note', error: err.message });
  }
}

/**
 * Delete note if owner
 */
async function deleteNote(req, res) {
  try {
    const noteId = parseInt(req.params.id, 10);
    const deleted = await notesService.deleteNote(req.user.user_id, noteId);
    if (!deleted) return res.status(404).json({ message: 'Note not found or not owned by user' });
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete note', error: err.message });
  }
}

module.exports = {
  createNote,
  listNotes,
  getNote,
  updateNote,
  deleteNote,
};
