const { User } = require("../../db/models/user/user")


const getSelectedList = (user, listId) => user.tasksLists.id(listId)
const getSelectedTask = (user, listId, taskId) => {
    console.log(user, listId, taskId)
    const selectedList = getSelectedList(user, listId)
    return selectedList.tasks.id(taskId)
}


const getSelectedSubtask = (user, listId, taskId, subtaskId) => {
    const selectedTask = getSelectedTask(user, listId, taskId)
    return selectedTask.subtasks.id(subtaskId)
}

const getUserById = userId => User.findById(userId)


const middlewares = {
    post: async (req, res) => {
        const {listId, taskId, text} = req.body;
        const user = await getUserById(req.userId)
        const {subtasks} = getSelectedTask(user, listId, taskId)
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
        const user = await getUserById(req.userId)
        const subtask = getSelectedSubtask(user, listId, taskId, subtaskId)
        const [key, value] = Object.entries(newValue)[0] //! Зробити абстракцію!!!
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
        const user = await getUserById(req.userId)
        const subtask = getSelectedSubtask(user, listId, taskId, subtaskId)
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