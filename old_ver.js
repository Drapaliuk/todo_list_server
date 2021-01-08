const { authConfigs } = require("../configs/authorization");
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');
const { User } = require("../db/models/user/user");


const isAuthorization = async (req, res, next) => {
    const token = req.headers.authorization;
    const refreshToken = req.headers.refresh_token;

    const {jwtKey, tokenOptions} = authConfigs;
    let shouldUpdateTokens = null;
    let isTokenInvalid = false;
    let userId;

    if(!token) {
        return res.status(403)
                  .json({responseCode: 0, message: 'Headers doesn`t have auth token', errName: 'missing token'});
    };
    
    try {
        const verifiedToken = jwt.verify(token, jwtKey, {algorithms: ['HS256']});
        userId = verifiedToken.userId;
    } catch ({name}) {
        const isUnexpectedError = name !==  'JsonWebTokenError' && name !==  'NotBeforeError' && name !==  'TokenExpiredError'

        if(name === 'JsonWebTokenError' || name === 'NotBeforeError') {
            return res.status(403).json({name: 'JsonWebTokenError', message: 'invalid token'})
        }

        if(name === 'TokenExpiredError') {
            const decodedToken =  jwt.decode(token, jwtKey);
            if(!decodedToken) {
                return res.status(403).json({name: 'TokenExpiredError', message: 'jwt expired'})
            }

            isTokenInvalid = true;
            userId = decodedToken.userId;
        }

        if(isUnexpectedError) {
            return res.status(404).json({name: 'UnexpectedJsonWebTokenError', message: 'unexpected error'})
        }
        
    }

    
    if(isTokenInvalid) {
        const user = await User.findById(userId);
        if(!user || user.auth.refreshToken !== refreshToken) {
            return res.status(403).json({responseCode: 0, message: 'Invalid token or refresh token'})
        }

        const newToken = jwt.sign({userId: userId}, jwtKey, tokenOptions);
        const newRefreshToken = uuid();
        await User.findByIdAndUpdate(userId, {'auth.refreshToken': newRefreshToken});

        shouldUpdateTokens = {newToken, newRefreshToken};
    }

    req.shouldUpdateTokens = shouldUpdateTokens;
    req.userId = userId;
    return next()
}

module.exports = isAuthorization
