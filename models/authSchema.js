const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    about: {
        type: String,
    },
    profilepic: {
        type: String,
    },
    friendsList: {
        type: Array,
    },
    followersList: {
        type: Array,
    },
    occupation: {
        type: String
    },
    location: {
        type: String
    },
    profileViews: {
        type: Number
    }
},
    { timestamps: true }
);

module.exports = User = mongoose.model("User", UserSchema);