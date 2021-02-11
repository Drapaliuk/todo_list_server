const { User } = require("../db/models/user/user")


class DBSelectors {
    static getTodayTasks(user, selectedListId) {
        return user.defaultTasksLists[selectedListId].tasks
    }

    static getSelectedDefaultTasksList(user, selectedListId) {
        return user.defaultTasksLists[selectedListId]
    }

    static getSelectedTodayTask(user, taskId) {
        return user.defaultTasksLists.DEFAULT_LIST__today.tasks.id(taskId)
    }

    static getUserById(userId) {
        return User.findById(userId)
    }

    static getSelectedList(user, listId, folderID) {
        if(folderID) {
            return user.tasksFolders.id(folderID).tasksLists.id(listId)
        }
        return user.tasksLists.id(listId)
    }

    static getSelectedFolder(user, folderId) {
        return user.tasksFolders.id(folderId)
    }

    static getSelectedTask (user, listId, taskId, folderID) {
        return this.getSelectedList(user, listId, folderID).tasks.id(taskId)
    }

    static getSelectedSubtask (user, listId, taskId, subtaskId, folderID) {
        const selectedTask = this.getSelectedTask(user, listId, taskId, folderID)
        return selectedTask.subtasks.id(subtaskId)
    }
    
    static getSelectedComment (user, listId, taskId, commentId, folderID) {
        const selectedTask = this.getSelectedTask(user, listId, taskId, folderID)
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