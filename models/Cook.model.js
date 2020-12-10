const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model("Cook", {
    name: String,
    image: String
}, "cooks")