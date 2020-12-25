const { User } = require("../../db/models/user/user");

const middlewares = {
    post: async (req, res) => {
        const {userId} = req;
        const {selectedListId, text} = req.body;
        const user = await User.findById(userId);
        const tasksList =  user.tasksLists.id(selectedListId);

        tasksList.tasks.push({text})
        user.save()

        const response = {
          listId: selectedListId,
          savedTask: tasksList.tasks[tasksList.tasks.length - 1]
        }
        return res.status(201).json(response)
                
      },

    put: (req, res) => { //changeTask
        const {userId} = req;
        const {selectedListId, taskId, newValue} = req.body;
      
        User.findById(userId)
            .then(user => {
              const tasksList = user.tasksLists.id(selectedListId);
              const task = tasksList.tasks.id(taskId);
              for (let key in newValue) {
                  task[key] = newValue[key]
              };
      
              console.log(newValue)
              user.save()
            })
      },

    delete: removeTask = (req, res) => {
        const {userId} = req;
        const {selectedListId, taskId} = req.body;
        User.findById(userId)
            .then(user => {
              const tasksList = user.tasksLists.id(selectedListId)
              console.log(tasksList)
              tasksList.tasks.id(taskId).remove();
              user.save()
            })
      }
}

module.exports = middlewares;