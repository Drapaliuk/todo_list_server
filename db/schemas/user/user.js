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
        country: {
            type: String,
            default: ''
        },

        birthday: {
            type: Number,
            default: null,
        },
    },
    personalData: {
        email: {
            type: String,
            default: ''
        },
        phone: {
            type: String,
            default: ''
        }
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


