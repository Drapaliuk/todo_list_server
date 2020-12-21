const express = require('express');
const router = express.Router();

const signIn = require('./sign_in')
const login = require('./login');
const logout = require('./logout');
const checkAuth = require('./check_auth');
const refresh = require('./refresh_token');

router.post('/signin', signIn.post)
      .post('/login', login.post)
      .delete('/logout', logout.delete)
      .get('/check', checkAuth.get)
      .post('/refreshToken', refresh.post)
      

module.exports = router;