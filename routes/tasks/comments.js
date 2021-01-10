const DBSelectors = require("../../utils/DBSelectors");

const middlewares = {
    post: async (req, res) => {
        const {listId, taskId, text} = req.body;

        const user = await DBSelectors.getUserById(req.userId)
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
        comment[key] = value
        user.save();

        const response = {
          listId,
          taskId,
          commentId,
          updates: value
        }

        res.status(200).json(response)
    },

    delete: async (req, res) => {
        const {listId, taskId, commentId} = req.body;
        console.log('BODY', req.body)
        const user = await DBSelectors.getUserById(req.userId)
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