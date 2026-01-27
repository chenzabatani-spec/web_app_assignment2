import { Response } from 'express';
import { AuthRequest } from '../middleware/auth_middleware';
import PostModel, { IPost } from '../models/post_model';
import { BaseController } from './base_controller';


class PostController extends BaseController<IPost> {
    constructor() {
        super(PostModel);
    }

    async create(req: AuthRequest, res: Response) {

        //take userId from req.user set by authMiddleware
        const userId = req.user?._id;

        if (userId) {
            //attach userId to the post being created
            req.body.sender = userId;
        }

        return super.create(req, res);
    }
}

export default new PostController();