const DBSelectors = require("../../utils/DBSelectors");
const defaultTasksListsIds = require('../../service_data/default_tasks_lists_ids');

const middlewares = {
    post: async (req, res) => {
        const {selectedListId, text, belongToFolder} = req.body;
        const user = await DBSelectors.getUserById(req.userId)
        if(selectedListId === defaultTasksListsIds.DEFAULT_LIST__today) {
          const todayTasks = DBSelectors.getTodayTasks(user, selectedListId)
          todayTasks.push({text, dateCreation: Date.now(), belongToList: selectedListId})
          user.save()

          const response = {
            listId: selectedListId,
            savedTask: todayTasks[todayTasks.length - 1]
          }
          
          return res.status(201).json(response)
        }

        

        const {tasks} = DBSelectors.getSelectedList(user, selectedListId, belongToFolder)
        tasks.push({text, dateCreation: Date.now(), belongToList: selectedListId})
        user.save()

        const response = {
          folderID: belongToFolder,
          listId: selectedListId,
          savedTask: tasks[tasks.length - 1]
        }
        
        return res.status(201).json(response)
                
      },

    put: async (req, res) => {
        const {selectedListId, selectedTaskId, newValue, folderID} = req.body;
        const user = await DBSelectors.getUserById(req.userId)


        if(selectedListId === defaultTasksListsIds.DEFAULT_LIST__today) {
          const task = DBSelectors.getSelectedTodayTask(user, selectedTaskId)
          const [key, value] = Object.entries(newValue)[0]
          task[key] = value
          user.save();
          const response = {
            folderID,
            listId: selectedListId,
            taskId: selectedTaskId,
            updatedValue: newValue
          }
  
         return res.status(200).json(response)
        }

        const task = DBSelectors.getSelectedTask(user, selectedListId, selectedTaskId, folderID)
        const [key, value] = Object.entries(newValue)[0]
        task[key] = value
        user.save();


        const response = {
          folderID,
          listId: selectedListId,
          taskId: selectedTaskId,
          updatedValue: newValue
        }

        return res.status(200).json(response)
      },

    delete: async (req, res) => {
        const {selectedListId, selectedTaskId, folderID} = req.body;
        const user = await DBSelectors.getUserById(req.userId)

        if(selectedListId === defaultTasksListsIds.DEFAULT_LIST__today) {
          const task = DBSelectors.getSelectedTodayTask(user, selectedTaskId)

          task.remove()
          user.save()
          const response = {
            listId: selectedListId,
            taskId: selectedTaskId
          }

          return res.status(200).json(response)
        }

        const task = DBSelectors.getSelectedTask(user, selectedListId, selectedTaskId, folderID)

        task.remove()
        user.save()

        const response = {
          folderID,
          listId: selectedListId,
          taskId: selectedTaskId
        }

        return res.status(200).json(response)
            
      }
}

module.exports = middlewares;