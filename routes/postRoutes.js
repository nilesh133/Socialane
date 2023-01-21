const express = require("express");
const router = express.Router();
const {savePost, fetchAllPosts, addRemoveLikes, saveComment} = require("../controllers/postController")

router.post("/save-post", savePost);
router.get("/fetch-all-posts", fetchAllPosts);
router.post("/add-remove-likes/:userId/:postId", addRemoveLikes);
router.post("/save-comment", saveComment);

module.exports = router;