const ResponseError = require("./response_error")

const errorHandler = (err, req, res, next) => {
    const isErrorHandled = err instanceof ResponseError

    if(isErrorHandled) {
        const {status, code, message} = err
        console.log(err)
        return res.status(status).json({
            error: code,
            description: message
        })
    } else {
        console.error(err)
        return res.status(500).send({
            error: 'GENERIC',
            description: 'Something went wrong. Please try again'
        })
    }

}

module.exports = errorHandler
