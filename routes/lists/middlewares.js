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
        const {tasksLists} = await User.findByIdAndUpdate(userId, {$push: {'tasksLists': {name: name}}}, {new: true})
        
        const response = {
          list: tasksLists[tasksLists.length - 1],
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

    delete: (req, res) => {
        const {userId} = req;
        const {listId} = req.body;
        
        User.findById(userId)
            .then(user => {
              user.tasksLists.id(listId).remove()
              user.save()
            })
    },

    settings: {
      put: (req, res) => {
        const {userId} = req;
        const {listId, newValues} = req.body;
        
        User.findById(userId)
            .then(user => {
              const {settings} = user.tasksLists.id(listId);
              for (let key in newValues) {
                settings[key] = newValues[key]
              }
    
              user.save()
            })       
      }
    }
    
}



module.exports = middlewares;