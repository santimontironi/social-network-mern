import AuthRepository from '../repository/auth.repository.js';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import transport from '../config/email.config.js';

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

            const hashedPassword = await bycrypt.hash(password, 10);

            const userConfirmed = await AuthRepository.findUserVerified(email);

            if (userConfirmed) {
                return res.status(400).json({ message: 'El email ya esta registrado y verificado' });
            }

            await AuthRepository.register(username, email, hashedPassword, name, surname);

            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

            const URL = `${process.env.FRONTEND_URL}/verify-email/${token}`;

            await transport.sendMail({
                from: process.env.EMAIL_FROM,
                to: email,
                subject: 'Bienvenido a nuestra plataforma',
                text: `Hola ${name}, gracias por registrarte en nuestra plataforma. Haz clic en el siguiente enlace para verificar tu email: ${URL}`,
            });

            res.status(201).json({ message: 'Usuario registrado exitosamente. Verifica tu email para iniciar sesión' });
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    }

    async verifyEmail(req, res) {
        try{
            const { token } = req.params;

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const email = decoded.email;

            const user = await AuthRepository.findByEmail(email);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const userVerified = await AuthRepository.findUserVerified(email);

            if (userVerified) {
                return res.status(400).json({ message: 'Email already verified' });
            }

            const verifiedUser = await AuthRepository.verifyEmail(email);

            if(!verifiedUser) {
                return res.status(500).json({ message: 'Error verifying email' });
            }

            const userAlreadyVerified = await AuthRepository.findUserVerified(email);

            if (!userAlreadyVerified) {
                return res.status(500).json({ message: 'Error verifying email' });
            }

            res.json({ message: 'Email verified successfully' });
        }
        catch (error) {
            res.status(500).json({ message: 'Error verifying email', error });
        }
    }

    async login(req, res) {
        try{
            const { identifier, password } = req.body;

            const user = await AuthRepository.findByIdentifier(identifier);

            if (!user) {
                return res.status(401).json({ message: 'Credenciales invalidas' });
            }

            const isMatch = await bycrypt.compare(password, user.password);

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

    async dashboardUser(req, res) {
        try{
            const userId = req.user.id;
            
            const userFounded = await AuthRepository.findById(userId);

            if (!userFounded) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const userFoundedData = {
                id: userFounded.id,
                username: userFounded.username,
                email: userFounded.email,
                name: userFounded.name,
                surname: userFounded.surname
            };

            res.json({ message: 'Dashboard accessed successfully', user: userFoundedData });
        }
        catch (error) {
            res.status(500).json({ message: 'Error accessing dashboard', error });
        }
    }
}

const authController = new AuthController();

export default authController;