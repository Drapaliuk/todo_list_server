const DBSelectors = require("../../utils/DBSelectors");
const defaultTasksListsIds = require('../../service_data/default_tasks_lists_ids');

const middlewares = {
    post: async (req, res) => {
        const {listId, taskId, text} = req.body;

        const user = await DBSelectors.getUserById(req.userId)

        if(listId === defaultTasksListsIds.DEFAULT_LIST__today) {
          const {comments} = user.defaultTasksLists[listId].tasks.id(taskId);
          comments.push({text})
          user.save();
          const response = {
            listId,
            taskId,
            createdElement: comments[comments.length - 1]
          }

          return res.status(201).json(response)
      }

        const {comments} = DBSelectors.getSelectedTask(user, listId, taskId)
        comments.push({text})
        user.save()

        const response = {
          listId,
          taskId,
          createdElement: comments[comments.length - 1]
        }
        
        return res.status(201).json(response)
                
      },

    put: async (req, res) => {
        const {listId, taskId, commentId, newValue} = req.body;

        const user = await DBSelectors.getUserById(req.userId)
        const comment = DBSelectors.getSelectedComment(user, listId, taskId, commentId)
        const [key, value] = Object.entries(newValue)[0] //! Зробити абстракцію!!!

        if(listId === defaultTasksListsIds.DEFAULT_LIST__today) {
          const selectedTask = user.defaultTasksLists[listId].tasks.id(taskId)
          const selectedComment = selectedTask.subtasks.id(commentId)
          selectedComment[key] = value
          user.save()

          const response = {
            listId,
            taskId,
            commentId,
            updates: newValue
          }
  
          return res.status(200).json(response)
        }


        comment[key] = value
        user.save();

        const response = {
          listId,
          taskId,
          commentId,
          updates: newValue
        }

        res.status(200).json(response)
    },

    delete: async (req, res) => {
        const {listId, taskId, commentId} = req.body;
        const user = await DBSelectors.getUserById(req.userId);
        
        if(listId === defaultTasksListsIds.DEFAULT_LIST__today) {
          const selectedTask = user.defaultTasksLists[listId].tasks.id(taskId)
          const deletedComment = selectedTask.comments.id(commentId);
          deletedComment.remove()
          user.save()
          const response = {
            listId,
            taskId,
            deletedCommentId: commentId
          }

          return res.status(200).json(response)
        }
        const comment = DBSelectors.getSelectedComment(user, listId, taskId, commentId)
        comment.remove()
        user.save()
        const response = {
            listId,
            taskId,
            deletedCommentId: commentId
        }

        res.status(200).json(response)
            
      }
}

module.exports = middlewares;