const express = require('express');
const router = express.Router();

const settingsMiddlewares = require('./middlewares')

router.put('/', settingsMiddlewares.put)
      
module.exports = router;