const { User } = require("../../db/models/user/user");

const middlewares = {
    post: async (req, res) => {
        const { userId, shouldUpdateTokens } = req;
        console.log('res', res.some)
        const {tasksLists: tasks, biography, settings } = await User.findById(userId);
        const payload = {tasks, biography, settings};
      
        const response = {
            responseCode: 1,
            shouldUpdateTokens,
            payload
        }

        res.status(200).json(response)
    }
}

module.exports = middlewares;