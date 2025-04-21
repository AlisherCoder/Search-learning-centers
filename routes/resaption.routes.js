import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/reception.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import rolePolice from "../middleware/rolePolice.js";

const reseptionRouter = Router();

reseptionRouter.get("/", verifyToken, rolePolice(["ADMIN", "SUPERADMIN"]), findAll);
reseptionRouter.get("/:id", verifyToken, findOne);
reseptionRouter.post("/", verifyToken, create);
reseptionRouter.patch("/:id", verifyToken, rolePolice(["ADMIN", "SUPERADMIN"]), update);
reseptionRouter.delete("/:id", verifyToken, remove);

export default reseptionRouter;

/**
 * @swagger
 * tags:
 *   name: Reseption
 *   description: reseption management endpoints
 */

/**
 * @swagger
 * /api/reception:
 *   get:
 *     summary: Get all Receptions
 *     tags: [Reseption]
 *     parameters:
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *         description: Number of Reception to retrieve per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       200:
 *         description: All Reception
 *       404:
 *         description: Not Found Reception
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/reception/{id}:
 *   get:
 *     tags: [Reseption]
 *     summary: Get a single Reception by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the Reception
 *     responses:
 *       200:
 *         description: Reception details
 *       404:
 *         description: Not found Reception
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/reseption:
 *   post:
 *     summary: Reseption
 *     tags: [Reseption]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - centerId
 *               - filialId
 *               - majorId
 *               - visitDate
 *             properties:
 *               centerId:
 *                 type: integer
 *                 example: 1
 *               filialId:
 *                 type: integer
 *                 example: 1
 *               majorId:
 *                 type: integer
 *                 example: 5
 *               visitDate:
 *                 type: date
 *                 example: "2025-05-14 10:00:00"
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
 * /api/reseption/{id}:
 *   patch:
 *     summary: Update a reception
 *     tags: [Reseption]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the reception to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ["PENDING", "VISIT", "NOT VISIT"]
 *                 example: "PENDING"
 *             optional:
 *               - status
 *     responses:
 *       200:
 *         description: Reception updated successfully
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Reception not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/reseption/{id}:
 *   delete:
 *     summary: Delete one Reseption
 *     tags: [Reseption]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Reseption ID
 *     responses:
 *       200:
 *         description: delete
 *       404:
 *         description: Not Found filed
 *       500:
 *         description: Server error
 */
