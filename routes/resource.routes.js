import { Router } from "express";
import {
   create,
   findAll,
   findBySearch,
   findOne,
   remove,
   update,
} from "../controllers/resource.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const resourceRoute = Router();


resourceRoute.get("/", findAll);
resourceRoute.get("/search", findBySearch);
resourceRoute.get("/:id", findOne);
resourceRoute.post("/", verifyToken, create);
resourceRoute.patch("/:id", verifyToken, update);
resourceRoute.delete("/:id", verifyToken, remove);


/**
 * @swagger
 * tags:
 *   name: Resources
 *   description: Resource management
 */

/**
 * @swagger
 * /api/resources:
 *   get:
 *     summary: Retrieve a list of resources
 *     tags: [Resources]
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
 *         description: A list of resources
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Resource'
 *                 total:
 *                   type: integer
 *       404:
 *         description: Resources not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/resources/search:
 *   get:
 *     summary: Search for resources
 *     description: Retrieves a list of resources filtered by name, userId, or categoryId with pagination and sorting options.
 *     tags:
 *       - Resources
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by resource name (partial match).
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Filter by user ID.
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         description: Filter by category ID.
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort by field (default is "name").
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: Sorting order (default is "ASC").
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination (default is 1).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page (default is 10).
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of resources.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Resource'
 *                 total:
 *                   type: integer
 *                   description: Total number of matching resources.
 *       400:
 *         description: Invalid query parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: No resources found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */


/**
 * @swagger
 * /api/resources/{id}:
 *   get:
 *     summary: Retrieve a resource by ID
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The resource ID
 *     responses:
 *       200:
 *         description: A single resource
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       404:
 *         description: Resource not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/resources:
 *   post:
 *     summary: Create a new resource
 *     tags: [Resources]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryId
 *               - name
 *               - description
 *               - media
 *               - image
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: The ID of the user who created the resource
 *               categoryId:
 *                 type: integer
 *                 description: The ID of the category the resource belongs to
 *               name:
 *                 type: string
 *                 description: The name of the resource
 *               description:
 *                 type: string
 *                 description: The description of the resource
 *               media:
 *                 type: string
 *                 description: The media URL of the resource
 *               image:
 *                 type: string
 *                 description: The image URL of the resource
 *             example:
 *               userId: 1
 *               categoryId: 1
 *               name: "Sample Resource"
 *               description: "This is a sample resource"
 *               media: "https://example.com/media.mp4"
 *               image: "https://example.com/image.jpg"
 *     responses:
 *       201:
 *         description: Resource created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       400:
 *         description: Bad request (e.g., missing required fields)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/resources/{id}:
 *   patch:
 *     summary: Update a resource by ID
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The resource ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: integer
 *                 description: The updated category of the resource
 *               name:
 *                 type: string
 *                 description: The updated name of the resource
 *               description:
 *                 type: string
 *                 description: The updated description of the resource
 *               media:
 *                 type: string
 *                 description: The updated media URL of the resource
 *               image:
 *                 type: string
 *                 description: The updated image URL of the resource
 *             example:
 *               categoryId: 3
 *               name: "Updated Resource Name"
 *               description: "Updated resource description"
 *               media: "https://example.com/updated-media.mp4"
 *               image: "https://example.com/updated-image.jpg"
 *     responses:
 *       200:
 *         description: Resource updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       404:
 *         description: Resource not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/resources/{id}:
 *   delete:
 *     summary: Delete a resource by ID
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The resource ID
 *     responses:
 *       200:
 *         description: Resource deleted successfully
 *       404:
 *         description: Resource not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Resource:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the resource
 *         userId:
 *           type: integer
 *           description: The ID of the user who created the resource
 *         categoryId:
 *           type: integer
 *           description: The ID of the category the resource belongs to
 *         name:
 *           type: string
 *           description: The name of the resource
 *         description:
 *           type: string
 *           description: The description of the resource
 *         media:
 *           type: string
 *           description: The media URL of the resource
 *         image:
 *           type: string
 *           description: The image URL of the resource
 *       example:
 *         id: 1
 *         userId: 1
 *         categoryId: 1
 *         name: "Sample Resource"
 *         description: "This is a sample resource"
 *         media: "https://example.com/media.mp4"
 *         image: "https://example.com/image.jpg"
 */

export default resourceRoute;
