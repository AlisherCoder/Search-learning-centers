import { Router } from "express";
import {
   create,
   remove,
   update,
} from "../controllers/reception.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import rolePolice from "../middleware/rolePolice.js";

const reseptionRouter = Router();

reseptionRouter.post("/", verifyToken, create);
reseptionRouter.patch("/:id", verifyToken, rolePolice(["admin"]), update);
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
 *               - userId
 *               - centerId
 *               - filialId
 *               - majorId
 *               - visitDate
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 2
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
 *                 enum: ["pending", "visit", "not visit"]
 *                 example: "pending"
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
 *     summary: Get one Reseption
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
