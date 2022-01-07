import { Router } from "express";
import authMiddleware from "../../middlewares/auth-middleware";
import postController from "../../controllers/postController";

const router = Router();
router.post("/newpost", authMiddleware, postController.createNewPost);
router.post("/editpost", authMiddleware, postController.editPost);
router.post("/deletepost", authMiddleware, postController.deletePost);
router.post("/myposts", authMiddleware, postController.getMyPosts);
router.post("/changerate", authMiddleware, postController.changeRating);
router.post("/allposts/:page", postController.getAllPostsForAuthUser);
router.post("/:id", postController.getPost);
router.post("/find", postController.findPosts);

export default router;
