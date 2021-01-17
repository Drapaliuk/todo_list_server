const DBSelectors = require("../../utils/DBSelectors");





const middlewares = {
    todayTasks: {
        post: async (req, res) => {
            const {selectedListId, text} = req.body;
            const user = await DBSelectors.getUserById(req.userId)
            const todayTask = DBSelectors.getTodayTasks(user, selectedListId)
            todayTask.push({text, dateCreation: Date.now(), belongToList: selectedListId})
            user.save()

            const response = {
              listId: selectedListId,
              createdTask: todayTask[todayTask.length - 1]
            }
            
            return res.status(201).json(response)
                    
          },
    
        put: async (req, res) => {
            const {selectedListId, selectedTaskId, newValue} = req.body;
            const user = await DBSelectors.getUserById(req.userId)

            const task = DBSelectors.getSelectedTodayTask(user, selectedTaskId)
            const [key, value] = Object.entries(newValue)[0]
            task[key] = value
            user.save();
            const response = {
              listId: selectedListId,
              taskId: selectedTaskId,
              updatedValue: newValue
            }
    
            res.status(200).json(response)
          },
    
        delete: removeTask = async (req, res) => {
            const {selectedListId, selectedTaskId} = req.body;
    
            const user = await DBSelectors.getUserById(req.userId)
            const task = DBSelectors.getSelectedTodayTask(user, selectedTaskId)
    
            task.remove()
            user.save()
            const response = {
              listId: selectedListId,
              taskId: selectedTaskId
            }
    
            res.status(200).json(response)
                
          }
    },

    settings: {
        put: async (req, res) => {
            const {userId} = req;
            const {selectedListId, newValue} = req.body;
            const user = await DBSelectors.getUserById(userId)
            const {settings} = user.defaultTasksLists[selectedListId];
            const [key, value] = Object.entries(newValue)[0];
            settings[key] = value;
            user.save()
    
            const response = {
                listId: selectedListId,
                updatedValue: newValue
            }
            res.status(200).json(response)
          }
    }

    
}

module.exports = middlewares;