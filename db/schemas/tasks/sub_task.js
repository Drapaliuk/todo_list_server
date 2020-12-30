const { Schema } = require("mongoose");


exports.SubTaskSchema = new Schema({
    text: String,
    hasDone: {
        type: Boolean,
        default: false
    }
})