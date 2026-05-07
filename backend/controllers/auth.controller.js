import AuthRepository from '../repository/auth.repository.js';
import Bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthController {
    async register(req, res) {
        try{
            const { username, email, password, name, surname } = req.body;

            const emailExists = await AuthRepository.findByEmail(email);
            const usernameExists = await AuthRepository.findByUsername(username);

            if (emailExists) {
                return res.status(400).json({ message: 'El email ya esta registrado' });
            }

            if (usernameExists) {
                return res.status(400).json({ message: 'El nombre de usuario ya esta en uso' });
            }

            const hashedPassword = await Bycrypt.hash(password, 10);

            const user = await AuthRepository.register(username, email, hashedPassword, name, surname);

            res.status(201).json({ message: 'User registered successfully', user });
        }
        catch (error) {
            res.status(500).json({ message: 'Error registering user', error });
        }
    }

    async login(req, res) {
        try{
            const { identifier, password } = req.body;

            const user = await AuthRepository.findByIdentifier(identifier);

            if (!user) {
                return res.status(401).json({ message: 'Credenciales invalidas' });
            }

            const isMatch = await Bycrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: 'Credenciales invalidas' });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '5d' });

            res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' });

            res.json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } });
        }
        catch (error) {
            res.status(500).json({ message: 'Error logging in', error });
        }
    }
}