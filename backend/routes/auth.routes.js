import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import verifyToken from "../middlewares/verify-token.js";
import { upload } from "../middlewares/multer.js";

export const router = Router();

router.post('/register', upload.single('photo'), authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/dashboard', verifyToken, authController.dashboardUser);
router.get('/verify-email/:token', authController.verifyEmail);
