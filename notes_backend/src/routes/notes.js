const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes');
const { authenticateJWT } = require('../services/jwt');

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Notes CRUD endpoints
 */

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: List all notes (optionally search)
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: search
 *         in: query
 *         description: Search query
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of notes
 */
router.get('/', authenticateJWT, notesController.listNotes);

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Note created
 */
router.post('/', authenticateJWT, notesController.createNote);

/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     summary: Get note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Note data
 *       404:
 *         description: Note not found
 */
router.get('/:id', authenticateJWT, notesController.getNote);

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Update note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note updated
 *       404:
 *         description: Not found or not owner
 */
router.put('/:id', authenticateJWT, notesController.updateNote);

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Note deleted
 *       404:
 *         description: Not found or not owner
 */
router.delete('/:id', authenticateJWT, notesController.deleteNote);

module.exports = router;
