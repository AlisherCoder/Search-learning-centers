import { Router } from "express";
import { create, remove } from "../controllers/majorItem.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import rolePolice from "../middleware/rolePolice.js";

const majorItemRoute = Router();

majorItemRoute.post("/", verifyToken, rolePolice(["ADMIN", "CEO", "SUPERADMIN"]), create);
majorItemRoute.delete("/", verifyToken, rolePolice(["ADMIN", "CEO", "SUPERADMIN"]), remove);

export default majorItemRoute;

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     MajorItemPost:
 *       type: object
 *       required:
 *         - centerId
 *         - majorItems
 *       properties:
 *         centerId:
 *           type: integer
 *           example: 1
 *         majorItems:
 *           type: array
 *           items:
 *             type: integer
 *           example:
 *             - 2
 *             - 3
 *             - 5
 */

/**
 * @swagger
 * /api/major-items:
 *   post:
 *     summary: Create multiple major items
 *     tags:
 *       - Major Items
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MajorItemPost'
 *     responses:
 *       201:
 *         description: Major items successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MajorItemDelete:
 *       type: object
 *       required:
 *         - centerId
 *         - majorItems
 *       properties:
 *         centerId:
 *           type: integer
 *           example: 1
 *         majorItems:
 *           type: array
 *           items:
 *             type: integer
 *           example: [2, 3, 5]
 */

/**
 * @swagger
 * /api/major-items:
 *   delete:
 *     summary: Remove major items from a center
 *     tags:
 *       - Major Items
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MajorItemDelete'
 *     responses:
 *       200:
 *         description: Successfully deleted major items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Deleted"
 *       500:
 *         description: Internal server error
 */
