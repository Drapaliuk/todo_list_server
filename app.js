const token = '1776151137:AAFqW5T8_5QSqK54a_77LSX6wmFmHkyxXpA'
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, {
    polling: {
      interval: 300,
      autoStart: true,
      params: {
        timeout: 10,
      },
    },
  });

bot.on('message', (msg) => {
    bot.sendMessage(msg.chat.id, 'First attempt!')
})



// const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// const cors = require('cors');

// const isAuthorization = require('./middlewares/is_authorizathison');
// const authRouter = require('./routes/auth/router')
// const initializeRouter = require('./routes/initialize/router');
// const listsRouter = require('./routes/lists/router');
// const tasksRouter = require('./routes/tasks/router');
// const biographyRouter = require('./routes/biography/router');
// const settingsRouter = require('./routes/settings/router');
// const personalDataRouter = require('./routes/personal_data/router');
// const defaultListsRouter = require('./routes/default_tasks_lists/router');
// const listFoldersRouter = require('./routes/folders/router')
// const errorHandler = require('./errors_handlers/errors_handler');
// const notFound = require('./errors_handlers/404');
// const { sendEmail } = require('./utils/mail');
// const app = express();

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({
//   extended: false
// }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// const corsOptions = {
//   "origin": "*",
//   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//   "preflightContinue": false,
//   "optionsSuccessStatus": 204
// }

// app.use(cors(corsOptions));
// app.use('/test', async (req, res) => {
//   const result = await sendEmail('vitaliidrapaliuk@gmail.com', 'Working', 'Text')
//   res.json(result)
// })
// app.use('/auth', authRouter)
// app.use('/', isAuthorization)
// app.use('/initialize', initializeRouter)
// app.use('/initialize/check-out', initializeRouter) //?
// app.use('/tasks', tasksRouter)
// app.use('/lists', listsRouter)
// app.use('/settings', settingsRouter)
// app.use('/biography', biographyRouter)
// app.use('/personalData', personalDataRouter)
// app.use('/default-lists', defaultListsRouter)
// app.use('/folders', listFoldersRouter)



// app.use(notFound);
// app.use(errorHandler)

// module.exports = app;