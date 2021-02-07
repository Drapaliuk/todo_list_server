const express = require('express');
const router = express.Router();

const middlewares = require('./middlewares')



router.post('/', middlewares.post)
      .put('/', middlewares.put)
      .delete('/', middlewares.delete)
      .put('/list', middlewares.insertList.put)
      .post('/list', middlewares.insertList.post)

module.exports = router;