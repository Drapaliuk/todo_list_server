const { Schema } = require("mongoose");
const { CommentSchema } = require("./comment");
const { SubTaskSchema } = require("./sub_task");

exports.TaskSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    belongToList : {
        type: String,
        default: ''
    },

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
    
    repeat: {
        type: Object,
        default: {start: null, end: null}
    }, 
    
    dateCreation: {
        type: Number,
        default: Date.now()
    },

    subtasks: [SubTaskSchema],
    comments: [CommentSchema],
    notes: {
        type: String,
        default: ''
    },
});