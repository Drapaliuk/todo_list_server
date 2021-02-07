const DBSelectors = require("../../utils/DBSelectors");

const middlewares = {
    post: async (req, res) => {
        const { userId, shouldUpdateTokens } = req;
        const {tasksLists: tasks, tasksFolders: folders,  biography, settings, personalData, defaultTasksLists } = await DBSelectors.getUserById(userId);
        const payload = {tasks, folders, biography, settings, personalData, defaultTasksLists};
      
        const response = {
            responseCode: 1,
            shouldUpdateTokens,
            payload
        }

        res.status(200).json(response)
    },
    checkOut: {
        get: (req, res) => {
            return res.status(200).end()
        }
    }
}

module.exports = middlewares;