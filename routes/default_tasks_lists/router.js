const express = require('express');

const router = express.Router();

const defaultListsMiddlewares = require('./middleware')

router.put('/settings', defaultListsMiddlewares.settings.put)

module.exports = router;