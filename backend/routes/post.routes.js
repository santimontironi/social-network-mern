import postController from "../controllers/post.controller.js";
import Router from "express";
import verifyToken from "../middlewares/verify-token.js";

export const router = Router();

router.post('/AddPost', verifyToken, postController.createPost);
router.get('/MyPosts', verifyToken, postController.getMyPosts);
router.post('/MyPosts/:idPost', verifyToken, postController.deletePost);