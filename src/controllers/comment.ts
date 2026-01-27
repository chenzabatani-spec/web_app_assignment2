import { Response } from 'express';
import { AuthRequest } from '../middleware/auth_middleware';
import CommentModel, { IComment } from '../models/comment_model';
import { BaseController } from './base_controller';

class CommentController extends BaseController<IComment> {
    constructor() {
        super(CommentModel);
    }

    async create(req: AuthRequest, res: Response) {
        //take userId from req.user set by authMiddleware
        const userId = req.user?._id;

        if (userId) {
            //attach userId to the comment being created
            req.body.sender = userId;
        }
        
        return super.create(req, res);
    }
}

export default new CommentController();