const express = require("express");
const app = express();
const User = require("../models/User");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// /auth/signup
app.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    // Store hash in your password DB.
    if (err) console.log("HASING ERROR", err);
    else {
      User.create({
        email: req.body.email,
        password: hash,
      })
        .then((user) => {
          res.status(200).send("user created");
        })
        .catch((err) => {
          res.status(500).send("Oooooeps");
        });
    }
  });
});

app.post("/login", (req, res) => {
    
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) res.status(403).send("Invalid credentials");
    else if (user) {
      bcrypt.compare(req.body.password, user.password, function (err, match) {
        // result == true
        if (err) res.status(500).send("Oooooeps");
        if (match) {
          var token = jwt.sign({ id: user._id }, "shhhhh");
          res.json({ token: token });
        } else res.status(403).send("Invalid credentials");
      });
    } else {
      res.status(403).send("Invalid credentials");
    }
  });
});

module.exports = app;
