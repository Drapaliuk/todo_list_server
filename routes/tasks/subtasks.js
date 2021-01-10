const DBSelectors = require("../../utils/DBSelectors")

const middlewares = {
    post: async (req, res) => {
        const {listId, taskId, text} = req.body;
        const user = await DBSelectors.getUserById(req.userId)
        const {subtasks} = DBSelectors.getSelectedTask(user, listId, taskId)
        subtasks.push({text})
        user.save()

        const response = {
          listId,
          taskId,
          createdSubtask: subtasks[subtasks.length - 1]
        }

        
        return res.status(201).json(response)
      },

    put: async (req, res) => {
        const {listId, taskId, subtaskId, newValue} = req.body;
        console.log(req.body)
        const user = await DBSelectors.getUserById(req.userId)
        const subtask = DBSelectors.getSelectedSubtask(user, listId, taskId, subtaskId)
        const [key, value] = Object.entries(newValue)[0]
        subtask[key] = value
        user.save();

        const response = {
          listId,
          taskId,
          subtaskId,
          changedSubTask: newValue
        }

        res.status(200).json(response)
    },

    delete: async (req, res) => {
        const {listId, taskId, subtaskId} = req.body;
        const user = await DBSelectors.getUserById(req.userId)
        const subtask = DBSelectors.getSelectedSubtask(user, listId, taskId, subtaskId)
        subtask.remove()
        user.save()
        const response = {
            listId,
            taskId,
            subtaskId
        }

        res.status(200).json(response)
            
      }
}

module.exports = middlewares;