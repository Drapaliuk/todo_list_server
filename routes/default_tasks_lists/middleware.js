const DBSelectors = require("../../utils/DBSelectors");

const middlewares = {
    settings: {
        put: async (req, res) => {
            const {userId} = req;
            const {selectedListId, newValue} = req.body;
            console.log(req.body)
            const user = await DBSelectors.getUserById(userId)
            console.log('user', user)
            const {settings} = user.defaultTasksLists[selectedListId];
            const [key, value] = Object.entries(newValue)[0];
            settings[key] = value;
            user.save()
    
            const response = {
                listId: selectedListId,
                updatedValue: newValue
            }
            res.status(200).json(response)
          }
    }

    
}

module.exports = middlewares;