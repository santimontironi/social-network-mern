import User from '../models/user.model.js';

class AuthRepository {
    async register(username, email, password, name, surname) {
        const user = new User({ username, email, password, name, surname });
        await user.save();
        return user;
    }

    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async findByUsername(username) {
        return await User.findOne({ username });
    }

    async findByIdentifier(identifier) {
        return await User.findOne({
            $or: [
                { username: identifier },
                { email: identifier }
            ]
        });
    }
}

const authRepository = new AuthRepository();

export default authRepository;