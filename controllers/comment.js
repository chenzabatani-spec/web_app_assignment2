const Comment = require('../models/comment_model');

const createComment = async (req, res) => {
    try {
        const comment = await Comment.create(req.body);
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllComments = async (req, res) => {
    const filter = req.query.postId ? { postId: req.query.postId } : {};

    try {
        const comments = await Comment.find(filter);
        res.send(comments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        res.send(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.send({ message: "Deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createComment,
    getAllComments,
    getCommentById,
    updateComment,
    deleteComment
};