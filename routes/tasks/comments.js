const { User } = require("../../db/models/user/user");


// attachments
const getSelectedList = (user, listId) => user.tasksLists.id(listId)
const getSelectedTask = (user, listId, taskId) => {
    const selectedList = getSelectedList(user, listId)
    return selectedList.tasks.id(taskId)
}


const getSelectedComment = (user, listId, taskId, subtaskId) => {
    const selectedTask = getSelectedTask(user, listId, taskId)
    return selectedTask.comment.id(subtaskId)
}

const getUserById = userId => User.findById(userId)



const middlewares = {
    post: async (req, res) => {
        const {listId, taskId, text} = req.body;

        const user = await getUserById(req.userId)
        const {comments} = getSelectedTask(user, listId, taskId)
        comments.push({text})
        user.save()

        const response = {
          listId,
          savedComment: comments[comments.length - 1]
        }
        
        return res.status(201).json(response)
                
      },

    put: async (req, res) => {
        const {listId, taskId, commentId, newText} = req.body;

        const user = await getUserById(req.userId)
        const comment = getSelectedComment(user, listId, taskId, commentId)
        comment.text = newText
        user.save();

        const response = {
          listId,
          taskId,
          commentId,
          updates: newText
        }

        res.status(200).json(response)
    },

    delete: async (req, res) => {
        const {listId, taskId, commentId} = req.body;
        const user = await getUserById(req.userId)
        const subtask = getSelectedTask(user, listId, taskId, commentId)
        subtask.remove()
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