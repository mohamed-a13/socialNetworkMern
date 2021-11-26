const router = require("express").Router();
const postController = require("../controllers/postController");
const multer = require("multer");
const upload = multer();

// Posts
router.get("/", postController.readPost);
router.post("/", upload.single("file"), postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

// Like
router.patch("/like/:id", postController.likePost);
// UnLike
router.patch("/unlike/:id", postController.unLikePost);

// Comments
router.patch("/comment-post/:id", postController.commentPost);
router.patch("/edit-comment-post/:id", postController.editCommentPost);
router.patch("/delete-comment-post/:id", postController.deleteCommentPost);

module.exports = router;
