import { Router } from "express";
import { findAll, findBySorted, create ,remove} from "../controllers/likeds.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const likedRouter = Router();

likedRouter.get("/", findAll);
likedRouter.get("/query", findBySorted);
likedRouter.post("/", verifyToken, create);
likedRouter.delete("/:id", verifyToken, remove);

export default likedRouter;

/**
 * @swagger
 * tags:
 *   name: Liked
 *   description: liked management endpoints
 */

/**
 * @swagger
 * /api/liked:
 *   get:
 *     summary: Get all Liked
 *     tags: [Liked]
 *     responses:
 *       200:
 *         description: All Liked
 *       404:
 *         description: Not
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/liked/query:
 *   get:
 *     summary: "Get all Liked"
 *     tags: [Liked]
 *     description: "Query orqali filter, sort va pagination bilan"
 *     parameters:
 *       - in: query
 *         name: column
 *         schema:
 *           type: string
 *           enum: [createdAt]
 *         description: "liked bo‘yicha filtr"
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: "Saralash tartibi: o'sish (asc) yoki kamayish (desc)"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: "Nechta natija qaytarish"
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: "Nechanchi natijadan boshlash (pagination)"
 *       - in: query
 *         name: dey
 *         schema:
 *           type: integer
 *           example: 10
 *         description: "dey liked"
 *     responses:
 *       200:
 *         description: "data"
 *       404:
 *         description: "Not Fount"
 *       500:
 *         description: "Server error"
 */



/**
 * @swagger
 * /api/liked:
 *   post:
 *     summary: Liked
 *     tags: [Liked]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - centerId
 *             properties:
 *               centerId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Created successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: server error
 */

/**
 * @swagger
 * /api/liked/{id}:
 *   delete:
 *     summary: Get one Liked
 *     tags: [Liked]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Liked ID
 *     responses:
 *       200:
 *         description: delete
 *       404:
 *         description: Not Found liked
 *       500:
 *         description: Server error
 */
