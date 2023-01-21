const User = require("../models/authSchema");
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.SECRET, {
        expiresIn: '7d',
    });
};

module.exports.registerValidation = [
    body("name").not().isEmpty().trim().withMessage("Please fill the name"),
    body("email").not().isEmpty().trim().withMessage("Please fill the Email").isEmail().withMessage("Email is not valid"),
    body("username").not().isEmpty().trim().withMessage("Please enter the username"),
    body("password").isLength({ min: 8 }).withMessage("Password must be 8 characters long"),
]

module.exports.userRegister = async (req, res) => {
    const { name, email, username, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.status(400).json({ errors: [{ msg: 'Email already exists' }] });
        }

        const checkUserUsername = await User.findOne({ username });
        if (checkUserUsername) {
            return res.status(400).json({ errors: [{ msg: 'Username already exists. Please choose another username' }] });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        try {
            const user = await User.create({
                name,
                email,
                username,
                password: hash
            });

            const token = generateToken(user);
            return res.status(200).json({ msg: 'Your account has been created', token });
        }
        catch (err) {
            return res.status(500).json({ errors: err });
        }
    }
    catch (err) {
        return res.status(500).json({ errors: err });
    }
}

module.exports.loginValidation = [
    body("email").not().isEmpty().trim().withMessage("Please fill the Email").isEmail().withMessage("Email is not valid"),
    body("password").isLength({ min: 8 }).withMessage("Password must be 8 characters long"),
]

module.exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const userValid = await User.findOne({ email });
        if (userValid) {
            const verifyPassword = await bcrypt.compare(password, userValid.password);
            if (verifyPassword) {
                const reponse = await User.findOneAndUpdate({ email }, {
                    isActive: true,
                    lastSeen: new Date(),
                }, { new: true });
                const token = generateToken(reponse);
                return res.status(200).json({ msg: 'Login Successful', token })
            }
            else {
                return res.status(401).json({ errors: [{ msg: "Password is not correct" }] });
            }
        }
        else {
            return res.status(400).json({ errors: [{ msg: 'Email not found' }] })
        }
    }
    catch (err) {
        return res.status(500).json({ errors: err });
    }
}