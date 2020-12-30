const express = require('express');
const router = express.Router();

const tasks = require('./tasks')
const subtasks = require('./subtasks') 
const comments = require('./comments');

router.post('/', tasks.post)
      .put('/', tasks.put)
      .delete('/', tasks.delete)
      .post('/subtasks', subtasks.post)
      .put('/subtasks', subtasks.put)
      .delete('/subtasks', subtasks.delete)
      .post('/comments', comments.post)
      .put('/comments', comments.put)
      .delete('/comments', comments.delete)
      
      

module.exports = router;