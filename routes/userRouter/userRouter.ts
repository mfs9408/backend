import { Router } from "express";
import userController from "../../controllers/userController";

const router = Router();
router.post("/registration", userController.userRegistration);
router.post("/login", userController.userAuthorization);
router.get("/logout", userController.userLogout);
router.get("/refresh", userController.refreshToken);
router.get("/activate/:link", userController.activateAccount);
router.get("/users");

export default router;
