const { Schema } = require("mongoose");
const { CommentSchema } = require("./comment");
const { SubTaskSchema } = require("./sub_task");

exports.TaskSchema = new Schema({
    text: String,
    hasDone: {
        type: Boolean,
        default: false
    },
    isImportant: {
        type: Boolean,
        default: false
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    remind: {
        type: Number,
        default: null
    },
    term: {
        type: Number,
        default: null
    },
    subTasks: [SubTaskSchema],
    comments: [CommentSchema],
    notes: String,
});