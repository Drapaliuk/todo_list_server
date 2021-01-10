const DBSelectors = require("../../utils/DBSelectors");

const middlewares = {
    post: async (req, res) => {
        const {selectedListId, text} = req.body;

        const user = await DBSelectors.getUserById(req.userId)
        const {tasks} = DBSelectors.getSelectedList(user, selectedListId)

        console.log('DATE CREATION:', Date.now())
        tasks.push({text, dateCreation: Date.now()})
        user.save()

        const response = {
          listId: selectedListId,
          savedTask: tasks[tasks.length - 1]
        }
        
        return res.status(201).json(response)
                
      },

    put: async (req, res) => {
        const {selectedListId, selectedTaskId, newValue} = req.body;
        console.log('UPDATE TASK', req.body)
        const user = await DBSelectors.getUserById(req.userId)
        const task = DBSelectors.getSelectedTask(user, selectedListId, selectedTaskId)

        const [key, value] = Object.entries(newValue)[0]
        task[key] = value
        user.save();


        const response = {
          listId: selectedListId,
          taskId: selectedTaskId,
          changedValue: newValue
        }

        res.status(200).json(response)
      },

    delete: removeTask = async (req, res) => {
        const {selectedListId, selectedTaskId} = req.body;

        const user = await DBSelectors.getUserById(req.userId)
        const task = DBSelectors.getSelectedTask(user, selectedListId, selectedTaskId)

        task.remove()
        user.save()
        const response = {
          listId: selectedListId,
          taskId: selectedTaskId
        }

        res.status(200).json(response)
            
      }
}

module.exports = middlewares;