import { Router } from 'express';
import express from 'express';
import userRoute from './1.user.routes.js';
import upload from '../config/multer.js';
import centerRoute from './center.routes.js';
import majorItemRoute from './majorItem.routes.js';
import filialRoute from './filial.routes.js';

import fieldRouter from './Field.routes.js';
import subjectRouter from './subject.routes.js';
import mojorRouter from './major.routes.js';
import reseptionRouter from './resaption.routes.js';
import likedRouter from './liked.routes.js';
import categoryRoute from './category.routes.js';
import regionRoute from './region.routes.js';
import resourceRoute from './resource.routes.js';
import commentRoute from './comment.routes.js';

const mainRoute = Router();

mainRoute.use('/users', userRoute);
mainRoute.use('/centers', centerRoute);
mainRoute.use('/filials', filialRoute);
mainRoute.use('/major-items', majorItemRoute);

mainRoute.use('/fields', fieldRouter);
mainRoute.use('/subject', subjectRouter);
mainRoute.use('/major', mojorRouter);
mainRoute.use('/reseption', reseptionRouter);
mainRoute.use('/liked', likedRouter);
mainRoute.use('/categories', categoryRoute);
mainRoute.use('/regions', regionRoute);
mainRoute.use('/resources', resourceRoute);
mainRoute.use('/comments', commentRoute);

mainRoute.use('/upload', upload.single('image'), (req, res) => {
  res.status(201).json({ data: req.file.filename });
});

mainRoute.use('/image', express.static('uploads'));

export default mainRoute;

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: 📤 Upload an image 📤
 *     tags:
 *       - Upload
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: ✅ Image uploaded successfully ✅
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: "uploaded-image.jpg"
 *       400:
 *         description: ❌ Bad request ❌
 *       500:
 *         description: ❌ Internal server error ❌
 */

/**
 * @swagger
 * /api/image/{filename}:
 *   get:
 *     summary: 🖼️ Retrieve an uploaded image 🖼️
 *     tags:
 *       - Upload
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         description: Name of the image file to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ✅ Image retrieved successfully ✅
 *         content:
 *           image/*:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: ❌ Image not found ❌
 */
