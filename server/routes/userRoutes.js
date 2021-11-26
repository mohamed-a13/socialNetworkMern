const router = require("express").Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const uploadController = require("../controllers/uploadController");
const multer = require("multer");
const upload = multer();

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// user
// Show all users
router.get("/", userController.getAllUsers);
// Show user info
router.get("/:id", userController.userInfo);
// Update user
router.put("/:id", userController.updateUser);
// Delete user
router.delete("/:id", userController.deleteUser);
// Follow
router.patch("/follow/:id", userController.followUser);
// Unfolow
router.patch("/unfollow/:id", userController.unFollowUser);

// upload
router.post("/upload", upload.single("file"), uploadController.uploadProfil);
module.exports = router;
