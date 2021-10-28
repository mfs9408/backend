export {};
const Router = require("express");
const router = new Router();
const userController = require("../../controllers/userController/userController");
// const postController = require("../../controllers/postController/postController");
const { body } = require("express-validator");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.userRegistration
);
router.post("/login", userController.userAuthorization);
router.post("/logout", userController.userLogout);
router.get("/activate/:link", userController.activateAccount);
router.get("/refresh", userController.refreshToken);
router.get("/users");
// router.get("/createPost", postController.createNewPost);

module.exports = router;
