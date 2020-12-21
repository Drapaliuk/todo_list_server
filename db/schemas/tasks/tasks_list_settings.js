const { Schema } = require("mongoose");

exports.TasksListSettingsSchema = new Schema({
    isMute: Boolean,
    theme: String, 
})