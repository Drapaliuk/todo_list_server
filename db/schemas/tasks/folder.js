const { Schema } = require("mongoose");
const { TasksListSchema } = require("./tasks_list");

exports.TasksFolderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tasksLists: [TasksListSchema]
});