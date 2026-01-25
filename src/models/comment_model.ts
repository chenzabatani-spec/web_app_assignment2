import mongoose from 'mongoose';

export interface IComment {
    message: string;
    sender: string;
    postId: mongoose.Types.ObjectId;
}

const commentSchema = new mongoose.Schema<IComment>({
    message: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
});


const CommentModel = mongoose.model<IComment>('Comment', commentSchema);

export default CommentModel;