class ResponseError extends Error {
    constructor(code = 'GENERIC', status = 500, ...params) {
        super(...params)

        if(Error.captureStackTrace) {
            Error.captureStackTrace(this, ResponseError)
        }

        this.code = code
        this.status =  status
    }
}

module.exports = ResponseError