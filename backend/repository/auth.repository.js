import User from '../models/user.model.js';

class AuthRepository {
    async register(username, email, password, name, surname, birthDay, birthMonth, birthYear) {
        const user = new User({ username, email, password, name, surname, birthDay, birthMonth, birthYear });
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

    async findById(id) {
        const user = await User.findById(id);
        return user;
    }

    async findUserVerified(email) {
        return await User.findOne({ email, emailVerified: true });
    }

    async verifyEmail(email){
        return await User.findOneAndUpdate({ email }, { emailVerified: true }, { new: true });
    } 
}

const authRepository = new AuthRepository();

export default authRepository;