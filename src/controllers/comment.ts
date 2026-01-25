import { Request, Response } from 'express';
import CommentModel, { IComment } from '../models/comment_model';
import { BaseController } from './base_controller';

class CommentController extends BaseController<IComment> {
    constructor() {
        super(CommentModel);
    }

    async create(req: Request, res: Response) {
        return super.create(req, res);
    }
}

export default new CommentController();