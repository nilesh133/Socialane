const User = require("../models/authSchema");
require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.SECRET, {
        expiresIn: '7d',
    });
};

module.exports.fetchAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({});
        return res.status(200).json({ allUsers });
    }
    catch (err) {
        return res.status(500).json({ errors: err });
    }
}

module.exports.addRemoveFriend = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.userId});
        const friend = await User.findOne({_id: req.params.friendId});

        let userIdx = user.friendsList.indexOf(req.params.friendId);
        if(userIdx > -1){
            user.friendsList.splice(userIdx, 1);
        }
        else{
            user.friendsList.push(req.params.friendId);
        }

        let friendIdx = friend.followersList.indexOf(req.params.userId);
        if(friendIdx > -1){
            friend.followersList.splice(friendIdx, 1);
        }
        else{
            friend.followersList.push(req.params.userId);
        }

        const newUser = await User.findByIdAndUpdate(req.params.userId, {
            friendsList: user.friendsList
        }, {new: true})

        const newFriend = await User.findByIdAndUpdate(req.params.friendId, {
            followersList: friend.followersList
        }, {new: true})

        const token = generateToken(newUser);
        return res.status(200).json({ msg: 'Friend updated successfully', token });
    }
    catch(err) {
        return res.status(500).json({ errors: err });
    }
}

module.exports.updateUserProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.body.id, {
            profilepic: req.body.profilepic,
            name: req.body.name
        }, {new: true})


        const token = generateToken(user);
        return res.status(200).json({ msg: 'Profile Updated successfully', token });
    }
    catch (err) {
        return res.status(500).json({ errors: err });
    }
}

module.exports.updateProfileAbout = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.body.id, {
            about: req.body.about,
            occupation: req.body.occupation,
            location: req.body.location
        }, {new: true})

        const token = generateToken(user);
        return res.status(200).json({ msg: 'Profile About Updated successfully', token });
    }
    catch (err) {
        return res.status(500).json({ errors: err });
    }
}