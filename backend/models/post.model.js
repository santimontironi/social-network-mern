import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    description: {
        type: String
    },
    fk_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
}

);

const Post = mongoose.model('Post', postSchema);

export default Post;