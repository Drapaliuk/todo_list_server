const express = require('express');

const router = express.Router();

const defaultListsMiddlewares = require('./middleware')

router.put('/settings', defaultListsMiddlewares.settings.put)
      .post('/today-tasks', defaultListsMiddlewares.todayTasks.post)
      .put('/today-tasks', defaultListsMiddlewares.todayTasks.put)
      .delete('/today-tasks', defaultListsMiddlewares.todayTasks.delete)


module.exports = router;