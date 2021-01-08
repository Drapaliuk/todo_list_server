const express = require('express');
const router = express.Router();

const personalDataMiddlewares = require('./middlewares')

router.put('/', personalDataMiddlewares.put)
      
module.exports = router;