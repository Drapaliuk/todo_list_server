const express = require('express');
const router = express.Router();

const registrations = require('./registrations')
const login = require('./login');
const logout = require('./logout');

router.post('/registration', registrations.post)
      .post('/login', login.post)
      .delete('/logout', logout.delete)

module.exports = router;