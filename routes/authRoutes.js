const express = require("express");
const router = express.Router();
const {userRegister, userLogin, logout, registerValidation, loginValidation} = require("../controllers/authController")

router.post("/user-register", registerValidation, userRegister);
router.post("/user-login", loginValidation, userLogin);

module.exports = router;