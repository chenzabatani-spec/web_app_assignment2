import Post from '../models/post_model';
import { Request, Response } from 'express';

const createPost = async (req: Request, res: Response) => {
    try {
        const post = await Post.create(req.body);
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

const getAllPosts = async (req: Request, res: Response) => {
    const filter = req.query.sender ? { sender: req.query.sender } : {};

    try {
        const posts = await Post.find(filter);
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

const getPostById = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

const updatePost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export default {
    createPost,
    getAllPosts,
    getPostById,
    updatePost
};