const DBSelectors = require("../../utils/DBSelectors");

const middlewares = {
    post: async (req, res) => {
        const {userId, shouldUpdateTokens} = req;
        const {name} = req.body;
        const user = await DBSelectors.getUserById(userId);
        user.tasksLists.push({name})
        user.save()
        const response = {
          list: user.tasksLists[user.tasksLists.length - 1],
          shouldUpdateTokens,
        }

        res.status(201).json(response)
    },

    put: async (req, res) => {
      const {selectedListId, newValue} = req.body;

      const user = await DBSelectors.getUserById(req.userId)
      const list = DBSelectors.getSelectedList(user, selectedListId)
      const [key, value] = Object.entries(newValue)[0]
      list[key] = value
      user.save();

      const response = {
        listId: selectedListId,
        changedValue: newValue
      }

      res.status(200).json(response)
    },

    delete: async (req, res) => {
        const {userId} = req;
        const {listId} = req.body;

        const user = await DBSelectors.getUserById(userId)
        user.tasksLists.id(listId).remove()
        user.save()
        res.status(200).json({deletedListId: listId})
    },

    settings: {
      put: async (req, res) => {
        const {userId} = req;
        const {selectedListId, newValue} = req.body;

        const user = await DBSelectors.getUserById(userId)
        
        const {settings} = user.tasksLists.id(selectedListId);
        const [key, value] = Object.entries(newValue)[0]
        settings[key] = value
        user.save()

        const response = {
            listId: selectedListId,
            changedValue: newValue
        }
        res.status(200).json(response)
      }
    }
    
}



module.exports = middlewares;