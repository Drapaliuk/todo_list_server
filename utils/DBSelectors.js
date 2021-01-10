const { User } = require("../db/models/user/user")

class DBSelectors {
    static getUserById(userId) {
        return User.findById(userId)
    }

    static getSelectedList(user, listId) {
        return user.tasksLists.id(listId)
    }

    static getSelectedTask (user, listId, taskId) {
        const selectedList = this.getSelectedList(user, listId)
        return selectedList.tasks.id(taskId)
    }

    static getSelectedSubtask (user, listId, taskId, subtaskId) {
        const selectedTask = this.getSelectedTask(user, listId, taskId)
        return selectedTask.subtasks.id(subtaskId)
    }
    
    static getSelectedComment (user, listId, taskId, commentId) {
        const selectedTask = this.getSelectedTask(user, listId, taskId)
        return selectedTask.comments.id(commentId)
      }
}

module.exports = DBSelectors;


// const getSelectedList = (user, listId) => user.tasksLists.id(listId)
// const getSelectedTask = (user, listId, taskId) => {
//     const selectedList = getSelectedList(user, listId)
//     return selectedList.tasks.id(taskId)
// }

// const getSelectedSubtask = (user, listId, taskId, subtaskId) => {
//     const selectedTask = getSelectedTask(user, listId, taskId)
//     return selectedTask.subtasks.id(subtaskId)
// }

// const getSelectedComment = (user, listId, taskId, commentId) => {
//   const selectedTask = getSelectedTask(user, listId, taskId)
//   return selectedTask.comments.id(commentId)
// }