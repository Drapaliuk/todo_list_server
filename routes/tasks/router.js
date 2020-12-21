const express = require('express');
const router = express.Router();

const middlewares = require('./middlewares')


router.get('/', middlewares.get)
      .post('/', middlewares.post)
      .put('/', middlewares.put)
      .delete('/', middlewares.delete)
         



module.exports = router;