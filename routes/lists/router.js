const express = require('express');
const router = express.Router();

const middlewares = require('./middlewares')



router.post('/', middlewares.post)
      .put('/', middlewares.put)
      .delete('/', middlewares.delete)
      .put('/settings', middlewares.settings.put)
         



module.exports = router;