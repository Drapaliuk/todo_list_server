const { model } = require("mongoose");
const { UserSchema } = require("../../schemas/user/user");

exports.User = model('user', UserSchema);