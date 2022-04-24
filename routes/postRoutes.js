const express = require("express")
const postController = require("../controllers/postController")
const protect = require("../middleware/authMiddleware")
const router = express.Router()

// localhost:3000/
router.route("/")
    .get(postController.getAllPosts)
    .post(protect, postController.createPost)

// localhost:3000/:id/
router.route("/:id")
    .get(postController.getOnePost)
    .patch(protect, postController.updatePost)
    .delete(protect, postController.deletePost)

module.exports = router
