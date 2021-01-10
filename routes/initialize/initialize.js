const DBSelectors = require("../../utils/DBSelectors");

const middlewares = {
    post: async (req, res) => {
        const { userId, shouldUpdateTokens } = req;
        const {tasksLists: tasks, biography, settings, personalData } = await DBSelectors.getUserById(userId);
        const payload = {tasks, biography, settings, personalData};
      
        const response = {
            responseCode: 1,
            shouldUpdateTokens,
            payload
        }

        res.status(200).json(response)
    }
}

module.exports = middlewares;