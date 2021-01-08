const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const isAuthorization = require('./middlewares/is_authorizathison');
const authRouter = require('./routes/auth/router')
const initializeRouter = require('./routes/initialize/router');
const listsRouter = require('./routes/lists/router');
const tasksRouter = require('./routes/tasks/router');
const biographyRouter = require('./routes/biography/router');
const settingsRouter = require('./routes/settings/router');
const personalDataRouter = require('./routes/personal_data/router');
const errorHandler = require('./errors_handlers/errors_handler');
const notFound = require('./errors_handlers/404');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/auth', authRouter)
app.use('/', isAuthorization)
app.use('/initialize', initializeRouter)
app.use('/tasks', tasksRouter)
app.use('/lists', listsRouter)
app.use('/settings', settingsRouter)
app.use('/biography', biographyRouter)
app.use('/personalData', personalDataRouter)

app.use(notFound);
app.use(errorHandler)

module.exports = app;