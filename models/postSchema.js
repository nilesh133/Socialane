const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    user_name: {
        type: String,
        required: true,
    },
    user_username: {
        type: String,
        required: true,
    },
    user_profilepic: {
        type: String,
    },
    posturl: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
    },
    comments: [
        {
            user_id: {
                type: String
            },
            user_name: {
                type: String
            },
            user_profilepic: {
                type: String
            },
            comment: {
                type: String
            }
        }
    ],
},
    { timestamps: true }
);

module.exports = Post = mongoose.model("Post", PostSchema);