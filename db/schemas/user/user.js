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
            _id: {
                type: String,
                default: 'DEFAULT_LIST__today'
            },
            name: {
                type: String,
                default: 'Today'
            },
            tasks: [TaskSchema],
            settings: {
                sortBy: {
                    type: String,
                    default: ''
                }
            }
        },
        DEFAULT_LIST__week: {
            _id: {
                type: String,
                default: 'DEFAULT_LIST__week'
            },
            name: {
                type: String,
                default: 'Week'
            },
            settings: {
                sortBy: {
                    type: String,
                    default: ''
                }
            }
        },
        DEFAULT_LIST__important: {
            _id: {
                type: String,
                default: 'DEFAULT_LIST__important'
            },
            name: {
                type: String,
                default: 'Important'
            },
            settings: {
                sortBy: {
                    type: String,
                    default: ''
                },
                
            }
        }
    },

    tasks: [TaskSchema],
    tasksLists: [TasksListSchema]
});


