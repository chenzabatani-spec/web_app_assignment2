import { Request, Response } from 'express';
import PostModel, { IPost } from '../models/post_model';
import { BaseController } from './base_controller';

class PostController extends BaseController<IPost> {
    constructor() {
        super(PostModel);
    }

    async create(req: Request, res: Response) {
        return super.create(req, res);
    }
}

export default new PostController();