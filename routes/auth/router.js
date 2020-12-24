const express = require('express');
const router = express.Router();

const registrations = require('./registrations')
const login = require('./login');
const logout = require('./logout');
const checkAuth = require('./check_auth');
const refreshToken = require('./refresh_token');

router.post('/registration', registrations.post)
      .post('/login', login.post)
      .delete('/logout', logout.delete)
      .get('/check', checkAuth.get)
      .post('/refreshToken', refreshToken.post)
      

module.exports = router;