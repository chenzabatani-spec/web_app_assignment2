import express from 'express';
import userController from '../controllers/user';
import authMiddleware from '../middleware/auth_middleware';

const router = express.Router();

router.get('/', authMiddleware, userController.getAll.bind(userController));
router.get('/:id', authMiddleware, userController.getById.bind(userController));
router.put('/:id', authMiddleware, userController.update.bind(userController));
router.delete('/:id', authMiddleware, userController.delete.bind(userController));

export default router;