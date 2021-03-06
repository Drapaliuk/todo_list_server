const mongoose = require('mongoose');
const { TaskSchema } = require('../tasks/task');
const { TasksListSchema } = require('../tasks/tasks_list');
const defaultTasksListsIds = require('../../../service_data/default_tasks_lists_ids');
const { TasksFolderSchema } = require('../tasks/folder');


exports.UserSchema = new mongoose.Schema({
    auth: {
        login: String,
        password: String,
        refreshToken: String
    },

    tasks: [TaskSchema],
    tasksLists: [TasksListSchema],
    tasksFolders: [TasksFolderSchema],
    
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
                default: defaultTasksListsIds.DEFAULT_LIST__today
            },
            name: {
                type: String,
                default: 'Today'
            },
            tasks: [TaskSchema],
            settings: {
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
            }
        },
        DEFAULT_LIST__week: {
            _id: {
                type: String,
                default: defaultTasksListsIds.DEFAULT_LIST__week
            },
            name: {
                type: String,
                default: 'Week'
            },
            settings: {
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
            }
        },
        DEFAULT_LIST__important: {
            _id: {
                type: String,
                default: defaultTasksListsIds.DEFAULT_LIST__important
            },
            name: {
                type: String,
                default: 'Important'
            },
            settings: {
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
            }
        }
    }
});


