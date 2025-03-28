import { Router } from "express";
import {
   create,
   findAll,
   findByLike,
   findByStar,
   findOne,
   remove,
   update,
} from "../controllers/center.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import rolePolice from "../middleware/rolePolice.js";

const centerRoute = Router();

centerRoute.get("/star", findByStar);
centerRoute.get("/like", findByLike);
centerRoute.get("/", findAll);
centerRoute.get("/:id", findOne);
centerRoute.post("/", verifyToken, rolePolice(["ADMIN", "CEO"]), create);
centerRoute.delete("/:id", verifyToken, rolePolice(["ADMIN", "CEO"]), remove);
centerRoute.patch("/:id", verifyToken, rolePolice(["ADMIN", "CEO"]), update);

export default centerRoute;

/**
 * @swagger
 * components:
 *   schemas:
 *     Center:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier of the learning center
 *           example: 1
 *         name:
 *           type: string
 *           description: The name of the learning center
 *           example: "Modern IT Center"
 *         phone:
 *           type: string
 *           description: The phone number of the learning center
 *           example: "998953901313"
 *         regionId:
 *           type: integer
 *           description: The region where the learning center is located
 *           example: 1
 *         address:
 *           type: string
 *           description: The full address of the learning center
 *           example: "Tashkent City, Chilonzor District"
 *         image:
 *           type: string
 *           description: URL of the learning center's image
 *           example: "center.jpg"
 *
 * tags:
 *   - name: Centers
 *     description: API endpoints for managing learning centers
 *
 * /api/centers:
 *   get:
 *     tags: [Centers]
 *     summary: Retrieve all learning centers
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Search by learning center name
 *       - in: query
 *         name: regionId
 *         schema:
 *           type: integer
 *         description: Search by region ID
 *       - in: query
 *         name: seoId
 *         schema:
 *           type: integer
 *         description: Search by SEO user ID
 *       - in: query
 *         name: address
 *         schema:
 *           type: string
 *         description: Search by adress
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *         description: Limit the number of results
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Pagination page number
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: Sorting order (ASC or DESC)
 *     responses:
 *       200:
 *         description: List of learning centers
 *       404:
 *         description: No learning centers found
 *
 * /api/centers/{id}:
 *   get:
 *     tags: [Centers]
 *     summary: Retrieve a specific learning center by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the learning center
 *     responses:
 *       200:
 *         description: Learning center found
 *       404:
 *         description: Learning center not found
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/centers:
 *   post:
 *     tags: [Centers]
 *     summary: Create a new learning center
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
 *               - regionId
 *               - address
 *               - image
 *               - majorsId
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 20
 *                 description: Name of the learning center
 *                 example: "Tech Academy"
 *               regionId:
 *                 type: integer
 *                 description: ID of the region where the center is located
 *                 example: 1
 *               address:
 *                 type: string
 *                 description: Address of the learning center
 *                 example: "123 Main St, Tashkent"
 *               image:
 *                 type: string
 *                 description: Image URL or filename of the center
 *                 example: "center.jpg"
 *               majorsId:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: List of major IDs associated with the center
 *                 example: [1, 2, 3]
 *               phone:
 *                 type: string
 *                 pattern: "^(?:\\+998|998)?\\d{9}$"
 *                 description: Phone number of the center
 *                 example: "+998901234567"
 *     responses:
 *       200:
 *         description: Learning center successfully created
 *       401:
 *         description: Not allowed to create center
 *       422:
 *         description: Validation error
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/centers/{id}:
 *   delete:
 *     tags: [Centers]
 *     summary: Delete a learning center
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the learning center to delete
 *     responses:
 *       200:
 *         description: Learning center successfully deleted
 *       401:
 *         description: Not allowed to delete this center
 *       404:
 *         description: Learning center not found
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/centers/{id}:
 *   patch:
 *     tags: [Centers]
 *     summary: Update a learning center
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the learning center to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Center name
 *                 example: "Modern Learning Center"
 *               address:
 *                 type: string
 *                 description: Center address
 *                 example: "123 Main St, City"
 *               phone:
 *                 type: string
 *                 description: Contact phone number
 *                 example: "+998901234567"
 *               image:
 *                 type: string
 *                 description: Image filename
 *                 example: "center.jpg"
 *     responses:
 *       200:
 *         description: Learning center successfully updated
 *       401:
 *         description: Not allowed to update this center
 *       404:
 *         description: Learning center not found
 *       422:
 *         description: Validation error
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/centers/like:
 *   get:
 *     tags: [Centers]
 *     summary: Retrieve centers sorted by likes
 *     description: Retrieve learning centers sorted by the number of likes (ascending or descending).
 *     parameters:
 *       - in: query
 *         name: pageLike
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limitLike
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Centers sorted by likes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Center'
 *                 total:
 *                   type: integer
 *                   description: Total number of centers
 *                 page:
 *                   type: integer
 *                   description: Current page number
 *                 limit:
 *                   type: integer
 *                   description: Number of items per page
 *       404:
 *         description: No centers found
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/centers/star:
 *   get:
 *     tags: [Centers]
 *     summary: Retrieve centers filtered by star rating
 *     description: Retrieve learning centers filtered by average star rating (between minStar and maxStar).
 *     parameters:
 *       - in: query
 *         name: minStar
 *         schema:
 *           type: number
 *           format: float
 *           default: 0
 *         description: Minimum star rating (inclusive)
 *       - in: query
 *         name: maxStar
 *         schema:
 *           type: number
 *           format: float
 *           default: 5
 *         description: Maximum star rating (inclusive)
 *     responses:
 *       200:
 *         description: Centers filtered by star rating
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 centers:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Center'
 *       404:
 *         description: No centers found
 *       400:
 *         description: Bad request
 */
