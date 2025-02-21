import { Router } from "express";
import {
   create,
   findAll,
   findBySearch,
   findOne,
   remove,
   update,
} from "../controllers/region.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import rolePolice from "../middleware/rolePolice.js";

const regionRoute = Router();

regionRoute.get("/", findAll);
regionRoute.get("/search", findBySearch);
regionRoute.get("/:id", findOne);
regionRoute.post("/", verifyToken, rolePolice(["ADMIN"]), create);
regionRoute.patch("/:id", verifyToken, rolePolice(["ADMIN"]), update);
regionRoute.delete("/:id", verifyToken, rolePolice(["ADMIN"]), remove);

/**
 * @swagger
 * tags:
 *   name: Regions
 *   description: Region management
 */

/**
 * @swagger
 * /api/regions:
 *   get:
 *     summary: Retrieve a list of regions
 *     tags: [Regions]
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
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: The sort order
 *     responses:
 *       200:
 *         description: A list of regions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Region'
 *                 total:
 *                   type: integer
 *       404:
 *         description: Regions not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/regions/search:
 *   get:
 *     summary: Search regions by name
 *     tags: [Regions]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: The name to search for
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
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: The sort order
 *     responses:
 *       200:
 *         description: A list of regions matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Region'
 *                 total:
 *                   type: integer
 *       404:
 *         description: Regions not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/regions/{id}:
 *   get:
 *     summary: Retrieve a region by ID
 *     tags: [Regions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The region ID
 *     responses:
 *       200:
 *         description: A single region
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Region'
 *       404:
 *         description: Region not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/regions:
 *   post:
 *     summary: Create a new region
 *     tags: [Regions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the region
 *             example:
 *               name: "Toshkent"
 *     responses:
 *       201:
 *         description: Region created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Region'
 *       400:
 *         description: Bad request (e.g., missing required fields)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/regions/{id}:
 *   patch:
 *     summary: Update a region by ID
 *     tags: [Regions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The region ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the region
 *             example:
 *               name: "Samarqand"
 *     responses:
 *       200:
 *         description: Region updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Region'
 *       404:
 *         description: Region not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/regions/{id}:
 *   delete:
 *     summary: Delete a region by ID
 *     tags: [Regions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The region ID
 *     responses:
 *       200:
 *         description: Region deleted successfully
 *       404:
 *         description: Region not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Region:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the region
 *         name:
 *           type: string
 *           description: The name of the region
 *       example:
 *         id: 1
 *         name: "Toshkent"
 */

export default regionRoute;
