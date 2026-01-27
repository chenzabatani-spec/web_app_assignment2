import express from 'express';
import commentController from '../controllers/comment';
import authMiddleware from '../middleware/auth_middleware';

const router = express.Router();

// Public routes
router.get('/', commentController.getAll.bind(commentController));
router.get('/:id', commentController.getById.bind(commentController));

// Protected routes
router.post('/', authMiddleware, commentController.create.bind(commentController));
router.put('/:id', authMiddleware, commentController.update.bind(commentController));
router.delete('/:id', authMiddleware, commentController.delete.bind(commentController));

export default router;