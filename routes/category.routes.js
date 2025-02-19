import { Router } from "express";
import {
  create,
  findAll,
  findBySearch,
  findOne,
  remove,
  update,
} from "../controllers/category.controller.js";

const categoryRoute = Router();

categoryRoute.get("/", findAll);
categoryRoute.get("/query", findBySearch);
categoryRoute.get("/:id", findOne);
categoryRoute.post("/", create);
categoryRoute.patch("/:id", update);
categoryRoute.delete("/:id", remove);

export default categoryRoute;



/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: categories management endpoints
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: All categories
 *       404:
 *         description: Not 
 *       500:
 *         description: Server error
 */



/**
 * @swagger
 * /api/categories/query:
 *   get:
 *     summary: "Get all categories"
 *     tags: [Categories]
 *     description: "Query orqali filter, sort va pagination bilan"
 *     parameters:
 *       - in: query
 *         name: column
 *         schema:
 *           type: string
 *           enum: [name]
 *         description: "categories bo‘yicha filtr"
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
 * /api/categories/{id}:
 *   get:
 *     summary: Get one categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: categories ID
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
 * /api/categories:
 *   post:
 *     summary: categories
 *     tags: [Categories]
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
 * /api/categories/{id}:
 *   patch:
 *     summary: Update a Field
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to update
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
 *       204:
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
 * /api/categories/{id}:
 *   delete:
 *     summary: Get one categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: categories ID
 *     responses:
 *       200:
 *         description: delete
 *       404:
 *         description: Not Found category
 *       400:
 *         description: validation error
 *       500:
 *         description: Server error
 */

