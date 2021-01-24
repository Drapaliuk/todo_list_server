const express = require('express');
const router = express.Router();

const initialize = require('./initialize');

router.post('/', initialize.post)
      .get('/check-out', initialize.checkOut.get)
      

module.exports = router;