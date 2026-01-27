import express from 'express';
import authController from '../controllers/auth';
import authMiddleware from '../middleware/auth_middleware';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refresh);
router.post('/change-password', authMiddleware, authController.changePassword);

export default router;