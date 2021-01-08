const { User } = require("../../db/models/user/user");

const middlewares = {
    get: (req, res) => {
        const {userId} = req;
        User.findById(userId)
            .then(user => {
              console.log('---------------', user.tasksLists)
            })
      },

    post: async (req, res) => {
        const {userId, shouldUpdateTokens} = req;
        const {name} = req.body;
        const user = await User.findById(userId);
        user.tasksLists.push({name: name})
        user.save()
        const response = {
          list: user.tasksLists[user.tasksLists.length - 1],
          shouldUpdateTokens,
        }

        res.status(201).json(response)
    },

    put: (req, res) => {
        const {userId} = req;
        const {listId, newName} = req.body;
        
        User.findById(userId)
            .then(user => {
              const tasksList = user.tasksLists.id(listId);
              tasksList.name = newName
              user.save()
            }) 
    },

    delete: async (req, res) => {
        const {userId} = req;
        const {listId} = req.body;
        console.log('userId', userId)
        console.log('listId', listId)

        const user = await User.findById(userId)
        user.tasksLists.id(listId).remove()
        user.save()
        res.status(200).json({deletedListId: listId})
    },

    settings: {
      put: async (req, res) => {
        const {userId} = req;
        const {selectedListId, newValue} = req.body;

        const user = await User.findById(userId)
        
        const {settings} = user.tasksLists.id(selectedListId);
        const [key, value] = Object.entries(newValue)[0]
        settings[key] = value

        console.log('settings', settings)
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