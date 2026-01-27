import express from 'express';
import postController from '../controllers/post';
import authMiddleware from '../middleware/auth_middleware';

const router = express.Router();

//public routes
router.get('/', postController.getAll.bind(postController));
router.get('/:id', postController.getById.bind(postController));

//protected routes
router.post('/', authMiddleware, postController.create.bind(postController));
router.put('/:id',authMiddleware, postController.update.bind(postController));
router.delete('/:id',authMiddleware, postController.delete.bind(postController));

export default router;