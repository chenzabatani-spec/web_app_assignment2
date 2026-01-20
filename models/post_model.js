const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: String,
    sender: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Post', postSchema);