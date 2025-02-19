import { Router } from "express";
import { findAll, findBySorted, findOne, create ,remove} from "../controllers/likeds.controller.js";

const likedRouter = Router();

likedRouter.get("/", findAll);
likedRouter.get("/query", findBySorted);
likedRouter.get("/:id", findOne);
likedRouter.post("/", create);
likedRouter.delete("/:id", remove);

export default likedRouter




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
 *         name: search
 *         schema:
 *           type: string
 *         description: "2025-02-19T06:54:40.242Z" 
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
 * /api/liked/{id}:
 *   get:
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
 *         description: data
 *       404:
 *         description: Not Fount
 *       500: 
 *         description: Server error  
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
 *               - userId
 *               - centerId
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 2
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
