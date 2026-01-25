import express from 'express';
import postController from '../controllers/post';

const router = express.Router();

router.post('/', postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);

export default router;