import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    fk_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    photo: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    bio: {
        type: String
    }
}, {
    timestamps: true
}

);

const Post = mongoose.model('Post', postSchema);

export default Post;