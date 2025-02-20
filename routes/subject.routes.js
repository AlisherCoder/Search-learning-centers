import { Router } from "express";
import {
   create,
   findAll,
   findBySorted,
   findOne,
   remove,
   update,
} from "../controllers/subject.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import rolePolice from "../middleware/rolePolice.js";

const subjectRouter = Router();

subjectRouter.get("/", findAll);
subjectRouter.get("/query", findBySorted);
subjectRouter.get("/:id", findOne);
subjectRouter.post("/", verifyToken, rolePolice(["admin"]), create);
subjectRouter.patch("/:id", verifyToken, rolePolice(["admin"]), update);
subjectRouter.delete("/:id", verifyToken, rolePolice(["admin"]), remove);

export default subjectRouter;

/**
 * @swagger
 * tags:
 *   name: Subject
 *   description: subject management endpoints
 */

/**
 * @swagger
 * /api/subject:
 *   get:
 *     summary: Get all Subject
 *     tags: [Subject]
 *     responses:
 *       200:
 *         description: All Subject
 *       404:
 *         description: Not
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/subject/query:
 *   get:
 *     summary: "Get all Subject"
 *     tags: [Subject]
 *     description: "Query orqali filter, sort va pagination bilan"
 *     parameters:
 *       - in: query
 *         name: column
 *         schema:
 *           type: string
 *           enum: [name]
 *         description: "subject bo‘yicha filtr"
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
 * /api/subject/{id}:
 *   get:
 *     summary: Get one Subject
 *     tags: [Subject]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Subject ID
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
 * /api/subject:
 *   post:
 *     summary: Subject
 *     tags: [Subject]
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
 * /api/subject/{id}:
 *   patch:
 *     summary: Update a Field
 *     tags: [Subject]
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
 *       200:
 *         description: Field updated successfully
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Field not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/subject/{id}:
 *   delete:
 *     summary: Get one Subject
 *     tags: [Subject]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Subject ID
 *     responses:
 *       200:
 *         description: delete
 *       404:
 *         description: Not Found filed
 *       500:
 *         description: Server error
 */
