const express = require("express");
const app = express();
const User = require("../models/User");
var jwt = require('jsonwebtoken');

// /auth/signup
app.post("/signup", (req,res)=> {
    User.create({
        email: req.body.email,
        password: req.body.password
    })
    .then((user)=> {
        res.status(200).send("user created")
    })
    .catch((err)=> {
        res.status(500).send("Oooooeps")
    })
})
// /auth/login
app.post("/login", (req,res)=> {
    User.findOne({email: req.body.email})
        .then((user)=> {
            if(!user) res.status(403).send("Invalid credentials");
            else if (user.password === req.body.password){
                var token = jwt.sign({ id: user._id }, 'shhhhh');
                res.json({token: token})
            }
            else {
                res.status(403).send("Invalid credentials");
            }
        })
})

module.exports = app;
