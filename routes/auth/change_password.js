const jwt = require('jsonwebtoken');
const { User } = require('../../db/models/user/user');
const bcrypt = require('bcrypt');
const configs = require('../../configs/authorization');
const { v4: uuid } = require('uuid');

const checkSecurityData = async (oldPassword, token, refreshToken) => {
    let userId;
    try {
        const verifiedToken = jwt.verify(token, configs.authConfigs.jwtKey, {algorithms: ['HS256']});
        userId = verifiedToken.userId
    } catch (error) {
        return false;
    }

    const user = await User.findById(userId);
    const currentRefreshToken = user.auth.refreshToken;
    const currentPassword = user.auth.password;
    const isMatchPasswords = bcrypt(oldPassword, currentPassword)
    const isMatchRefreshTokens = refreshToken === currentRefreshToken;

    if(isMatchRefreshTokens && isMatchPasswords) {
        return true;
    } else {
        return false;
    }
}



const middlewares = {
    put: async (req, res) => { 
        const {oldPassword, newPassword, token, refreshToken} = req.body;
        if(!oldPassword || !newPassword || !token || !refreshToken) {
            return res.status(400).json({message: 'There are not password or login'})
        }

        const isCorrectSecurityData = await checkSecurityData(oldPassword, token, refreshToken);

        if(!isCorrectSecurityData) return res.status(403);

        

        const saltedPassword = bcrypt.hashSync(password, 10);
        const {tokenOptions, jwtKey} = configs.authConfigs;


        const existLogin = await User.findOne({'auth.login': login})
        if(existLogin) {
            return res.status(406).json({message: 'This login has already use'})
        }

        const refreshToken = uuid();
        const {_id: userId} = await User.create({auth: {login, password: saltedPassword, refreshToken}})
        const token = jwt.sign({userId}, jwtKey, tokenOptions);

        res.status(201).json({userId, token, refreshToken})
    }
}