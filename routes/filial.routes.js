import { Router } from "express";
import {
   create,
   findAll,
   findOne,
   remove,
   update,
} from "../controllers/filial.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import rolePolice from "../middleware/rolePolice.js";

const filialRoute = Router();

filialRoute.get("/", findAll);
filialRoute.post("/", verifyToken, rolePolice(["admin", "seo"]), create);
filialRoute.get("/:id", findOne);
filialRoute.delete("/:id", verifyToken, rolePolice(["admin", "seo"]), remove);
filialRoute.patch("/:id", verifyToken, rolePolice(["admin", "seo"]), update);

export default filialRoute;

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Filial:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the filial
 *           example: 1
 *         name:
 *           type: string
 *           description: Filial name
 *           example: "Tashkent Filial"
 *         phone:
 *           type: string
 *           description: Filial phone number
 *           example: "998901234567"
 *         regionId:
 *           type: integer
 *           description: ID of the associated region
 *           example: 2
 *         centerId:
 *           type: integer
 *           description: ID of the associated center
 *           example: 5
 *         address:
 *           type: string
 *           description: Filial address
 *           example: "Amir Temur street, 5, Tashkent"
 *         image:
 *           type: string
 *           description: Filial image file name
 *           example: "filial1.jpg"
 *     Center:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the center
 *           example: 1
 *         name:
 *           type: string
 *           description: Center name
 *           example: "Modern Learning Center"
 *         phone:
 *           type: string
 *           description: Center phone number
 *           example: "998935678901"
 *         regionId:
 *           type: integer
 *           description: ID of the associated region
 *           example: 3
 *         address:
 *           type: string
 *           description: Center address
 *           example: "Navoi street, 10, Samarkand"
 *         seoId:
 *           type: integer
 *           description: User ID of the center's SEO
 *           example: 7
 *         image:
 *           type: string
 *           description: Center image file name
 *           example: "center1.jpg"
 *     Region:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the region
 *           example: 1
 *         name:
 *           type: string
 *           description: Region name
 *           example: "Tashkent"
 * tags:
 *   - name: Centers
 *     description: API endpoints for managing learning centers
 */

/**
 * @swagger
 * /api/filials:
 *   get:
 *     tags: [Filials]
 *     summary: Get all filials
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by filial name
 *       - in: query
 *         name: phone
 *         schema:
 *           type: string
 *         description: Filter by phone number
 *       - in: query
 *         name: regionId
 *         schema:
 *           type: integer
 *         description: Filter by region ID
 *       - in: query
 *         name: centerId
 *         schema:
 *           type: integer
 *         description: Filter by center ID
 *       - in: query
 *         name: address
 *         schema:
 *           type: string
 *         description: Filter by address
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Number of results per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: name
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: ASC
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of filials
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/filials/{id}:
 *   get:
 *     tags: [Filials]
 *     summary: Get a single filial by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the filial
 *     responses:
 *       200:
 *         description: Filial details
 *       404:
 *         description: Not found filial
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/filials:
 *   post:
 *     tags: [Filials]
 *     summary: Create a new filial
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *               - regionId
 *               - centerId
 *               - address
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Filial One"
 *               phone:
 *                 type: string
 *                 example: "998901234567"
 *               regionId:
 *                 type: integer
 *                 example: 1
 *               centerId:
 *                 type: integer
 *                 example: 2
 *               address:
 *                 type: string
 *                 example: "123 Main St, Tashkent"
 *               image:
 *                 type: string
 *                 example: "filial1.jpg"
 *     responses:
 *       200:
 *         description: Filial successfully created
 *       401:
 *         description: Not allowed
 *       404:
 *         description: Not found learning center
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/filials/{id}:
 *   delete:
 *     tags: [Filials]
 *     summary: Delete a filial by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Filial ID
 *     responses:
 *       200:
 *         description: Filial successfully deleted
 *       401:
 *         description: Not allowed
 *       404:
 *         description: Not found filial
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/filials/{id}:
 *   patch:
 *     tags: [Filials]
 *     summary: Update a filial by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Filial ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Filial name
 *               phone:
 *                 type: string
 *                 description: Filial phone number
 *               regionId:
 *                 type: integer
 *                 description: Associated region ID
 *               centerId:
 *                 type: integer
 *                 description: Associated center ID
 *               address:
 *                 type: string
 *                 description: Filial address
 *               image:
 *                 type: string
 *                 description: Image file name
 *     responses:
 *       200:
 *         description: Filial successfully updated
 *       401:
 *         description: Not allowed
 *       404:
 *         description: Not found filial
 *       422:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
