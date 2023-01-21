const Post = require("../models/postSchema");
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports.savePost = async (req, res) => {
    const { user_id, user_name, user_username, user_profilepic, posturl, caption, likes, comments } = req.body;

    try {
        const post = await Post.create({
            user_id,
            user_name,
            user_username,
            user_profilepic,
            posturl,
            caption,
            likes,
            comments
        });

        let allPosts = await Post.find({});
        allPosts = allPosts.reverse()

        return res.status(200).json({ allPosts });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ errors: err });
    }
}

module.exports.fetchAllPosts = async (req, res) => {
    try {
        let allPosts = await Post.find({});
        allPosts = allPosts.reverse()
        return res.status(200).json({ allPosts });
    }
    catch (err) {
        return res.status(500).json({ errors: err });
    }
}

module.exports.addRemoveLikes = async (req, res) => {
    try {
        const post = await Post.findOne({_id: req.params.postId});
        let idx = post.likes.indexOf(req.params.userId);

        if(idx > -1){
            post.likes.splice(idx, 1);
        }
        else{
            post.likes.push(req.params.userId);
        }

        const newPost = await Post.findByIdAndUpdate(req.params.postId, {
            likes: post.likes
        }, {new: true})

        let allPosts = await Post.find({});
        allPosts = allPosts.reverse()
        return res.status(200).json({ allPosts });
    }
    catch (err) {
        return res.status(500).json({ errors: err });
    }
}

module.exports.saveComment = async (req, res) => {
    try {
        const post = await Post.findOne({_id: req.body.postId});
        post.comments.push({
            user_id: req.body.user_id,
            user_name: req.body.user_name,
            user_profilepic: req.body.user_profilepic,
            comment: req.body.comment
        })

        const newPost = await Post.findByIdAndUpdate(req.body.postId, {
            comments: post.comments
        }, {new: true})

        let allPosts = await Post.find({});
        allPosts = allPosts.reverse()
        return res.status(200).json({ allPosts });
    }
    catch (err) {
        return res.status(500).json({ errors: err });
    }
}