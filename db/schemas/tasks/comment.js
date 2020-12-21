const { Schema } = require("mongoose");

exports.CommentSchema = new Schema({
    text: String,
})