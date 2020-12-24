const express = require('express');
const router = express.Router();

const initialize = require('./initialize');

router.post('/', initialize.post)
      

module.exports = router;