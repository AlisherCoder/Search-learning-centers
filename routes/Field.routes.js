import { Router } from "express";
import {
   create,
   findAll,
   findBySorted,
   findOne,
   remove,
   update,
} from "../controllers/field.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import rolePolice from "../middleware/rolePolice.js";

const fieldRouter = Router();

fieldRouter.get("/", findAll);
fieldRouter.get("/query", findBySorted);
fieldRouter.get("/:id", findOne);
fieldRouter.post("/", verifyToken, rolePolice(["admin"]), create);
fieldRouter.patch("/:id", verifyToken, rolePolice(["admin"]), update);
fieldRouter.delete("/:id", verifyToken, rolePolice(["admin"]), remove);

export default fieldRouter;

/**
 * @swagger
 * tags:
 *   name: Fields
 *   description: fields management endpoints
 */

/**
 * @swagger
 * /api/fields:
 *   get:
 *     summary: Get all Fields
 *     tags: [Fields]
 *     responses:
 *       200:
 *         description: All Fields
 *       404:
 *         description: Not
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/fields/query:
 *   get:
 *     summary: "Get all Fields"
 *     tags: [Fields]
 *     description: "Query orqali filter, sort va pagination bilan"
 *     parameters:
 *       - in: query
 *         name: column
 *         schema:
 *           type: string
 *           enum: [name]
 *         description: "fields bo‘yicha filtr"
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
 * /api/fields/{id}:
 *   get:
 *     summary: Get one Fields
 *     tags: [Fields]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Fields ID
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
 * /api/fields:
 *   post:
 *     summary: Fields
 *     tags: [Fields]
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
 * /api/fields/{id}:
 *   patch:
 *     summary: Update a Field
 *     tags: [Fields]
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
 * /api/fields/{id}:
 *   delete:
 *     summary: Get one Fields
 *     tags: [Fields]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Fields ID
 *     responses:
 *       200:
 *         description: delete
 *       404:
 *         description: Not Found filed
 *       500:
 *         description: Server error
 */
