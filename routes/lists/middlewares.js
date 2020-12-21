const { User } = require("../../db/models/user/user");

const middlewares = {
    get: (req, res) => {
        const {userId} = req;
        User.findById(userId)
            .then(user => {
              console.log('---------------', user.tasksLists)
            })
      },

    post: (req, res) => {
        const {userId} = req;
        const {tasksList} = req.body;
        User.findByIdAndUpdate(userId, {$push: {'tasksLists': tasksList}})
            .then((data, err) => {
              console.log(data)
            })
    },

    put: (req, res) => {
        const {userId} = req;
        const {tasksListId, renewal} = req.body;
        
        User.findById(userId)
            .then(user => {
              const tasksList = user.tasksLists.id(tasksListId);
              for (let key in renewal) {
                tasksList[key] = renewal[key]
              }
    
              user.save()
            })
    },

    delete: (req, res) => {
        const {userId} = req;
        const {tasksListId} = req.body;
        
        User.findById(userId)
            .then(user => {
              user.tasksLists.id(tasksListId).remove()
              user.save()
            })
      }
}



module.exports = middlewares;