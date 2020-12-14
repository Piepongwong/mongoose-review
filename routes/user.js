const express = require("express");
const app = express();
const User = require("../models/User");
const uploader = require('../config/cloudinary-setup');

app.post("/profile-pic", uploader.single('profile_picture'), (req, res)=> {
    User.findByIdAndUpdate(req.user._id, {
        profile_pic: req.file.path
    })
    .then((user)=> {
        res.send("oke")
    })
    .catch((err)=> {
        res.status(500).send("error")
    })
})

module.exports = app;
