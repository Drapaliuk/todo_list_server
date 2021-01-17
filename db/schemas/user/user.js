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

    defaultTasksLists: {
        DEFAULT_LIST__today: {
            tasks: [TaskSchema],
            settings: {
                sortBy: {
                    type: String,
                    default: ''
                }
            }
        },
        DEFAULT_LIST__week: {
            settings: {
                sortBy: {
                    type: String,
                    default: ''
                }
            }
        },
        DEFAULT_LIST__important: {
            settings: {
                sortBy: {
                    type: String,
                    default: ''
                }
            }
        }
    },

    tasks: [TaskSchema],
    tasksLists: [TasksListSchema]
});


