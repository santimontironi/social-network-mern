import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    birthDay: {
        type: Number,
        required: true
    },
    birthMonth: {
        type: Number,
        required: true
    },
    birthYear: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
}

);

const User = mongoose.model('User', userSchema);

export default User;