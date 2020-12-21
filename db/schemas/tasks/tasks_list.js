const { Schema } = require("mongoose")
const { TaskSchema } = require("./task")

exports.TasksListSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    settings: {
        isMute: {
            type: Boolean,
            default: false
        },
        theme: String, 
    },
    tasks: [TaskSchema]
})

