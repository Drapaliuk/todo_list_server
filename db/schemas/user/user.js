const mongoose = require('mongoose');
const { TaskSchema } = require('../tasks/task');
const { TasksListSchema } = require('../tasks/tasks_list');

exports.UserSchema = new mongoose.Schema({
    auth: {
        login: String,
        password: String,
        refreshToken: String
    },
    biography: {
        name: {
            type: String,
            default: '',
        },
        surname: {
            type: String,
            default: '',
        },
        birthDay: {
            type: Number,
            default: null,
        },
    },
    settings: {
        theme: {
            type: String,
            default: 'light'
        },
        language: {
            type: String,
            default: 'eng'
        }
    },
    tasks: [TaskSchema],
    tasksLists: [TasksListSchema]
});


