import express from 'express';
import commentController from '../controllers/comment';

const router = express.Router();

router.post('/', commentController.create.bind(commentController));
router.get('/', commentController.getAll.bind(commentController));
router.get('/:id', commentController.getById.bind(commentController));
router.put('/:id', commentController.update.bind(commentController));
router.delete('/:id', commentController.delete.bind(commentController));

export default router;