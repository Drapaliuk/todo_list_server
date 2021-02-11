const DBSelectors = require("../../utils/DBSelectors")
const defaultTasksListsIds = require('../../service_data/default_tasks_lists_ids');

const middlewares = {
    post: async (req, res) => {
        const {listId, taskId, text, folderID} = req.body;
        const user = await DBSelectors.getUserById(req.userId)

        if(listId === defaultTasksListsIds.DEFAULT_LIST__today) {
            const {subtasks} = user.defaultTasksLists[listId].tasks.id(taskId);
            subtasks.push({text})
            user.save();
            const response = {
              listId,
              taskId,
              createdSubtask: subtasks[subtasks.length - 1]
            }

            return res.status(201).json(response)
        }

        const {subtasks} = DBSelectors.getSelectedTask(user, listId, taskId, folderID)
        subtasks.push({text})
        user.save()

        const response = {
          folderID,
          listId,
          taskId,
          createdSubtask: subtasks[subtasks.length - 1]
        }

        
        return res.status(201).json(response)
      },

    put: async (req, res) => {
        const {listId, taskId, subtaskId, newValue, folderID} = req.body;
        const user = await DBSelectors.getUserById(req.userId)
        const [key, value] = Object.entries(newValue)[0]

        if(listId === defaultTasksListsIds.DEFAULT_LIST__today) {
          const selectedTask = user.defaultTasksLists[listId].tasks.id(taskId)
          const selectedSubtask = selectedTask.subtasks.id(subtaskId)
          selectedSubtask[key] = value
          user.save()

          const response = {
            folderID,
            listId,
            taskId,
            subtaskId,
            changedSubTask: newValue
          }
  
          return res.status(200).json(response)
        }

        const subtask = DBSelectors.getSelectedSubtask(user, listId, taskId, subtaskId, folderID)
        subtask[key] = value
        user.save();

        const response = {
          folderID,
          listId,
          taskId,
          subtaskId,
          changedSubTask: newValue
        }

        res.status(200).json(response)
    },

    delete: async (req, res) => {
        const {listId, taskId, subtaskId, folderID} = req.body;
        const user = await DBSelectors.getUserById(req.userId)

        if(listId === defaultTasksListsIds.DEFAULT_LIST__today) {
          const selectedTask = user.defaultTasksLists[listId].tasks.id(taskId)
          const selectedSubtask = selectedTask.subtasks.id(subtaskId);
          selectedSubtask.remove()
          user.save()
          const response = {
            folderID,
            listId,
            taskId,
            subtaskId
          }

          return res.status(200).json(response)
        }

        const subtask = DBSelectors.getSelectedSubtask(user, listId, taskId, subtaskId, folderID)
        subtask.remove()
        user.save()
        const response = {
            folderID,
            listId,
            taskId,
            subtaskId
        }

        res.status(200).json(response)
            
      }
}

module.exports = middlewares;