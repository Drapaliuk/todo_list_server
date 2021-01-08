const ResponseError = require('./response_error')

const notFound = (req, res, next) => {
    console.log('MY PERSONAL 404')
    next(new ResponseError('NOT FOUND', 404, 'request resource not found'))
}

module.exports = notFound;
