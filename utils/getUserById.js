const { User } = require("../db/models/user/user")
const getUserById = userId => User.findById(userId);
module.exports = getUserById