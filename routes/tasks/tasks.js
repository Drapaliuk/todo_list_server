const DBSelectors = require("../../utils/DBSelectors");

const middlewares = {
    post: async (req, res) => {
        const {selectedListId, text} = req.body;
        const user = await DBSelectors.getUserById(req.userId)
        console.log('selectedListId', selectedListId)
        if(selectedListId === 'DEFAULT_LIST__today') {
          console.log('IN POST!')
          const todayTasks = DBSelectors.getTodayTasks(user, selectedListId)
          todayTasks.push({text, dateCreation: Date.now(), belongToList: selectedListId})
          user.save()

          const response = {
            listId: selectedListId,
            savedTask: todayTasks[todayTasks.length - 1]
          }
          
          return res.status(201).json(response)

        }

        const {tasks} = DBSelectors.getSelectedList(user, selectedListId)

        tasks.push({text, dateCreation: Date.now(), belongToList: selectedListId})
        user.save()

        const response = {
          listId: selectedListId,
          savedTask: tasks[tasks.length - 1]
        }
        
        return res.status(201).json(response)
                
      },

    put: async (req, res) => {
        const {selectedListId, selectedTaskId, newValue} = req.body;
        const user = await DBSelectors.getUserById(req.userId)


        if(selectedListId === 'DEFAULT_LIST__today') {
          const task = DBSelectors.getSelectedTodayTask(user, selectedTaskId)
          const [key, value] = Object.entries(newValue)[0]
          task[key] = value
          user.save();
          const response = {
            listId: selectedListId,
            taskId: selectedTaskId,
            updatedValue: newValue
          }
  
         return res.status(200).json(response)
        }

        const task = DBSelectors.getSelectedTask(user, selectedListId, selectedTaskId)

        const [key, value] = Object.entries(newValue)[0]
        task[key] = value
        user.save();


        const response = {
          listId: selectedListId,
          taskId: selectedTaskId,
          updatedValue: newValue
        }

        return res.status(200).json(response)
      },

    delete: async (req, res) => {
        const {selectedListId, selectedTaskId} = req.body;
        console.log('BODY', req.body)
        const user = await DBSelectors.getUserById(req.userId)

        if(selectedListId === 'DEFAULT_LIST__today') {
          const task = DBSelectors.getSelectedTodayTask(user, selectedTaskId)

          task.remove()
          user.save()
          const response = {
            listId: selectedListId,
            taskId: selectedTaskId
          }

          return res.status(200).json(response)
        }

        const task = DBSelectors.getSelectedTask(user, selectedListId, selectedTaskId)

        task.remove()
        user.save()
        const response = {
          listId: selectedListId,
          taskId: selectedTaskId
        }

        return res.status(200).json(response)
            
      }
}

module.exports = middlewares;