import mongoose from 'mongoose';

const commentsSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    fk_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fk_post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentsSchema);

export default Comment;