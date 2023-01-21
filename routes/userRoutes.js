const express = require("express");
const router = express.Router();
const {fetchAllUsers, addRemoveFriend, updateUserProfile, updateProfileAbout} = require("../controllers/userController")

router.post("/fetch-all-users", fetchAllUsers);
router.post("/add-remove-friend/:userId/:friendId", addRemoveFriend);
router.post("/update-user-profile", updateUserProfile);
router.post("/update-profile-about", updateProfileAbout);

module.exports = router;