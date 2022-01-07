import { Router } from "express";
import { body } from "express-validator";
import userController from "../../controllers/userController";

const router = Router();
router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.userRegistration
);
router.post("/login", userController.userAuthorization);
router.get("/logout", userController.userLogout);
router.get("/refresh", userController.refreshToken);
router.get("/activate/:link", userController.activateAccount);
router.get("/users");

export default router;
