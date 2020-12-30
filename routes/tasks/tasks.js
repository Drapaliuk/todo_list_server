const { User } = require("../../db/models/user/user");


// attachments
const getSelectedList = (user, listId) => user.tasksLists.id(listId)
const getSelectedTask = (user, listId, taskId) => {
    const selectedList = getSelectedList(user, listId)
    return selectedList.tasks.id(taskId)
}
const getTaskAttachments = (attachment, user, listId, taskId, subTaskId) => {
    const selectedTask = getSelectedTask(user, listId, taskId)
    return selectedTask[attachment].id(subTaskId)
}

const getUserById = userId => User.findById(userId)

const ResponseData = function(listId, taskId, attachmentId, ) {

} 


const middlewares = {
    post: async (req, res) => {
        const {selectedListId, text} = req.body;

        const user = await getUserById(req.userId)
        const {tasks} = getSelectedList(user, selectedListId)
        tasks.push({text})
        user.save()

        const response = {
          listId: selectedListId,
          savedTask: tasks[tasks.length - 1]
        }
        
        return res.status(201).json(response)
                
      },


     

    put: async (req, res) => {
        const {selectedListId, selectedTaskId, newValue} = req.body;

        const user = await getUserById(req.userId)
        const task = getSelectedTask(user, selectedListId, selectedTaskId)
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

        const user = await getUserById(req.userId)
        const task = getSelectedTask(user, selectedListId, selectedTaskId)
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