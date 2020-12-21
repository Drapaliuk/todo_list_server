const jwt = require('jsonwebtoken');
const configs = require('../../configs/authorization');

const middlewares = {
    get: (req, res) => {
        const token = req.headers.authorization;

        try {
            jwt.verify(token, configs.authConfigs.jwtKey, {algorithms: ['HS256']});
        } catch (error) {
            return res.send(403).json({name: 'TokenExpiredError', respCode: 0, message: 'jwt expired'})
        }

        res.status(200).json({name: 'TokenDoesntExpired', respCode: 1})
    }
}

module.exports = middlewares;