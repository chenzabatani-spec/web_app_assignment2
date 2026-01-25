import Comment from '../models/comment_model';
import { Request, Response } from 'express';

const createComment = async (req: Request, res: Response) => {
    try {
        const comment = await Comment.create(req.body);
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

const getAllComments = async (req: Request, res: Response) => {
    const filter = req.query.postId ? { postId: req.query.postId } : {};

    try {
        const comments = await Comment.find(filter);
        res.send(comments);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

const getCommentById = async (req: Request, res: Response) => {
    try {
        const comment = await Comment.findById(req.params.id);
        res.send(comment);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

const updateComment = async (req: Request, res: Response) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(comment);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

const deleteComment = async (req: Request, res: Response) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.send({ message: "Deleted" });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export default {
    createComment,
    getAllComments,
    getCommentById,
    updateComment,
    deleteComment
};