const middlewares = {
    post: (req, res) => {
        const {userId} = req;
        const {tasksListId, task} = req.body;
      
        User.findById(userId)
            .then((user, err) => {
              if(err) return res.status(404)
      
              const tasksList =  user.tasksLists.id(tasksListId);
              tasksList.tasks.push(task)
              user.save()
                  .then((data, err) => {
                    if(err) return res.status(501)
                    console.log(data)
              })
            })
      },

    put: (req, res) => { //changeTask
        const {userId} = req;
        const {tasksListId, taskId, renewal} = req.body;
      
        User.findById(userId)
            .then(user => {
              const tasksList = user.tasksLists.id(tasksListId);
              const task = tasksList.tasks.id(taskId);
              for (let key in renewal) {
                  task[key] = renewal[key]
              };
      
              console.log(renewal)
              user.save()
            })
      },

    delete: removeTask = (req, res) => {
        const {userId} = req;
        const {tasksListId, taskId} = req.body;
        User.findById(userId)
            .then(user => {
              const tasksList = user.tasksLists.id(tasksListId)
              console.log(tasksList)
              tasksList.tasks.id(taskId).remove();
              user.save()
            })
      }
}

module.exports = middlewares;