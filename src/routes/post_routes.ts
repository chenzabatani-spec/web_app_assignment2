import express from 'express';
import postController from '../controllers/post';
import authMiddleware from '../middleware/auth_middleware';

const router = express.Router();

/**
* @swagger
* tags:
* name: Posts
* description: The Posts managing API
*/

/**
 * @swagger
 * /posts:
 *   get:
 *    summary: Retrieve a list of posts
 *    tags: [Posts]
 *    security: []
 *    parameters:
 *      - in: query
 *        name: sender
 *        schema:
 *         type: string
 *        description: Filter posts by sender user ID
 *        example: 609e129e1c4ae12f34567891
 *    responses:
 *    200:
 *      description: Successfully retrieved a list of posts
 *      content:
 *        application/json:
 *          schema:
 *           type: array
 *           items:
 *            $ref: '#/components/schemas/Post'
 *   500:
 *     description: Server Error
 */
router.get('/', postController.getAll.bind(postController));

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *         example: 609e129e1c4ae12f34567890
 *     responses:
 *       200:
 *         description: The post description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server Error
 */
router.get('/:id', postController.getById.bind(postController));

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *           example:
 *             title: "My first post"
 *             content: "Hello world from Swagger!"
 *             sender: "64f1a2b3c4d5e6f7890abc12"
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.post('/', authMiddleware, postController.create.bind(postController));

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *         example: 609e129e1c4ae12f34567890
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *           example:
 *             title: "Updated title"
 *             content: "Updated content"
 *     responses:
 *       200:
 *         description: The post was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server Error
 */
router.put('/:id',authMiddleware, postController.update.bind(postController));

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *         example: 609e129e1c4ae12f34567890
 *     responses:
 *       200:
 *         description: The post was deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server Error
 */
router.delete('/:id',authMiddleware, postController.delete.bind(postController));

export default router;