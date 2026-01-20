const Post = require('../models/post_model');

const createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllPosts = async (req, res) => {
    const filter = req.query.sender ? { sender: req.query.sender } : {};

    try {
        const posts = await Post.find(filter);
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost
};