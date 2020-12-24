const jwt = require('jsonwebtoken');
const configs = require('../../configs/authorization');

const middlewares = {
    get: (req, res) => {
        const token = req.headers.authorization;
        console.log(token)
        try {
            jwt.verify(token, configs.authConfigs.jwtKey, {algorithms: ['HS256']});
        } catch (error) {
            console.log(error)
            return res.status(403).json({name: 'TokenExpiredError', responseCode: 0, message: 'jwt expired'})
        }


        res.status(200).json({name: 'TokenDoesntExpired', responseCode: 1})
    }
}

module.exports = middlewares;