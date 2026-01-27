import { Request, Response } from 'express';
import User, { IUser } from '../models/user_model';
import { BaseController } from './base_controller';
import { AuthRequest } from '../middleware/auth_middleware';

class UserController extends BaseController<IUser> {
    constructor() {
        super(User);
    }

    async update(req: Request, res: Response) {
        const authReq = req as AuthRequest;
        // Ensure that users can only update their own information
        const userId = authReq.user?._id;

        if (userId !== req.params.id) {
             res.status(403).json({ message: 'Access denied: You can only update your own profile' });
             return;
        }

        if (req.body.password) {
            // Prevent password updates through this route
            delete req.body.password; 
        }

        return super.update(req, res);
    }
}

export default new UserController();