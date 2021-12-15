import { Router } from "express";
import authMiddleware from "../../middlewares/auth-middleware";
import postController from "../../controllers/postController";

const router = Router();
router.post("/newpost", authMiddleware, postController.createNewPost);
router.post("/editpost", authMiddleware, postController.editPost);
router.post("/deletepost", authMiddleware, postController.deletePost);
router.post("/myposts", authMiddleware, postController.getMyPosts);
router.post("/find", postController.findPosts);
router.get("/post/:id", postController.getPost);
router.get("/:page", postController.getAllPosts);

export default router;
