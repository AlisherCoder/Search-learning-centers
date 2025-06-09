import { Router } from 'express';
import {
  create,
  findAll,
  findOne,
  remove,
  update,
} from '../controllers/comment.controller.js';
import verifyToken from '../middleware/verifyToken.js';

const commentRoute = Router();

commentRoute.get('/', findAll);
commentRoute.get('/:id', findOne);
commentRoute.post('/', verifyToken, create);
commentRoute.patch('/:id', verifyToken, update);
commentRoute.delete('/:id', verifyToken, remove);

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment management
 */

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Retrieve a list of comments
 *     tags: [Comments]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: A list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *                 total:
 *                   type: integer
 *       404:
 *         description: Comments not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     summary: Retrieve a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: A single comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *               - star
 *               - centerId
 *             properties:
 *               text:
 *                 type: string
 *                 description: The text of the comment
 *               star:
 *                 type: number
 *                 description: The star rating of the comment
 *               centerId:
 *                 type: integer
 *                 description: The ID of the center the comment belongs to
 *             example:
 *               text: "Great service!"
 *               star: 5
 *               centerId: 1
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Bad request (e.g., missing required fields)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/comments/{id}:
 *   patch:
 *     summary: Update a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The updated text of the comment
 *               star:
 *                 type: number
 *                 description: The updated star rating of the comment
 *             example:
 *               text: "Updated comment text"
 *               star: 4
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the comment
 *         text:
 *           type: string
 *           description: The text of the comment
 *         star:
 *           type: number
 *           description: The star rating of the comment
 *         userId:
 *           type: integer
 *           description: The ID of the user who created the comment
 *         centerId:
 *           type: integer
 *           description: The ID of the center the comment belongs to
 *       example:
 *         id: 1
 *         text: "Great service!"
 *         star: 5
 *         userId: 1
 *         centerId: 1
 */

export default commentRoute;
