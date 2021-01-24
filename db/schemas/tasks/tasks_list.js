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
        theme: {
            type: String,
            default: ''
        },
        sort: {
            sortBy: {
                type: String,
                default: ''
            },
            order: {
                type: String,
                default: ''
            }
        }
    },
    tasks: [TaskSchema]
})

