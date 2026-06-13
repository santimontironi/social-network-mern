import postController from "../controllers/post.controller.js";
import Router from "express";
import verifyToken from "../middlewares/verify-token.js";
import { upload } from "../middlewares/multer.js";

export const router = Router();

router.post('/AddPost', verifyToken, upload.single('photo'), postController.createPost);
router.get('/MyPosts', verifyToken, postController.getMyPosts);
router.post('/MyPosts/:idPost', verifyToken, postController.deletePost);