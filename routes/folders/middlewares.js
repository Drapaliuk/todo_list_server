const DBSelectors = require("../../utils/DBSelectors");
const defaultTasksListsIds = require('../../service_data/default_tasks_lists_ids');

const middlewares = {
    post: async (req, res) => {
        const {userId, shouldUpdateTokens} = req;
        const {name} = req.body;
        const user = await DBSelectors.getUserById(userId);
        user.tasksFolders.push({name})
        user.save()

        const response = {
          createdFolder: user.tasksFolders[user.tasksFolders.length - 1],
          shouldUpdateTokens,
        }

        res.status(201).json(response)
    },

    put: async (req, res) => {
      const {selectedFolderID, newValue} = req.body;

      const user = await DBSelectors.getUserById(req.userId)
      const folder = DBSelectors.getSelectedFolder(user, selectedFolderID)
      const [key, value] = Object.entries(newValue)[0]
      folder[key] = value
      user.save();

      const response = {
        folderID: selectedFolderID,
        updatedValue: newValue
      }

      res.status(200).json(response)
    },

    delete: async (req, res) => {
        const {userId} = req;
        const {folderID} = req.body;

        const user = await DBSelectors.getUserById(userId)
        user.tasksFolders.id(folderID).remove()
        user.save()
        res.status(200).json({deletedFolderID: folderID})
    },

    insertList: {
      post: async (req, res) => {
        const {userId, shouldUpdateTokens} = req;
        const {name, selectedFolderID} = req.body;
        const user = await DBSelectors.getUserById(userId);
        
        const folder = user.tasksFolders.id(selectedFolderID)
        folder.tasksLists.push({name, belongToFolder: selectedFolderID})
        user.save()

        const response = {
          createdList: folder.tasksLists[folder.tasksLists.length - 1],
          folderID: selectedFolderID,
          shouldUpdateTokens
        }

        res.status(201).json(response)
      },

      put: async (req, res) => {
        const {userId} = req;
        const {selectedFolderID, insertedListID} = req.body;
        const user = await DBSelectors.getUserById(userId)
        const selectedFolder = await DBSelectors.getSelectedFolder(user, selectedFolderID)
        const insertedList = await DBSelectors.getSelectedList(user, insertedListID)
        selectedFolder.tasksLists.push(insertedList)
        selectedList.belongToFolder = selectedFolderID
        user.save()

        const response = {
            listID: insertedListID,
            folderID: selectedFolderID,
            changedValue: newValue
        }
        res.status(200).json(response)
      }
    },
}



module.exports = middlewares;