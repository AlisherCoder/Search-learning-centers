import { Router } from "express";
import {
   findAll,
   findBySorted,
   findOne,
   create,
   update,
   remove,
} from "../controllers/major.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import rolePolice from "../middleware/rolePolice.js";

const mojorRouter = Router();

mojorRouter.get("/", findAll);
mojorRouter.get("/query", findBySorted);
mojorRouter.get("/:id", findOne);
mojorRouter.post("/", verifyToken, rolePolice(["ADMIN"]), create);
mojorRouter.patch("/:id", verifyToken, rolePolice(["ADMIN"]), update);
mojorRouter.delete("/:id", verifyToken, rolePolice(["ADMIN"]), remove);

export default mojorRouter;

/**
 * @swagger
 * tags:
 *   name: Major
 *   description: major management endpoints
 */

/**
 * @swagger
 * /api/major:
 *   get:
 *     summary: Get all Major
 *     tags: [Major]
 *     responses:
 *       200:
 *         description: All Major
 *       404:
 *         description: Not
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/major/query:
 *   get:
 *     summary: "Get all Major"
 *     tags: [Major]
 *     description: "Query orqali filter, sort va pagination bilan"
 *     parameters:
 *       - in: query
 *         name: column
 *         schema:
 *           type: string
 *           enum: [name, SubjectId, FiledId]
 *         description: "major bo‘yicha filtr"
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: "search"
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
 * /api/major/{id}:
 *   get:
 *     summary: Get one Major
 *     tags: [Major]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Major ID
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
 * /api/major:
 *   post:
 *     summary: Major
 *     tags: [Major]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 example: "optional"
 *               image:
 *                 type: string
 *                 example: "linke"
 *               fieldId:
 *                     type: integer
 *                     example: 2
 *               subjectId:
 *                     type: integer
 *                     example: 4
 *     responses:
 *       201:
 *         description: Created successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /api/major/{id}:
 *   patch:
 *     summary: Update a major
 *     tags: [Major]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the field to update
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "updated name"
 *               image:
 *                 type: string
 *                 example: "updated link"
 *     responses:
 *       202:
 *         description: major updated successfully
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: major not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/major/{id}:
 *   delete:
 *     summary: Get one Major
 *     tags: [Major]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Major ID
 *     responses:
 *       200:
 *         description: delete
 *       404:
 *         description: Not Found filed
 *       500:
 *         description: Server error
 */
