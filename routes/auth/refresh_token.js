const jwt = require('jsonwebtoken');
const { User } = require('../../db/models/user/user');
const configs = require('../../configs/authorization');
const { v4: uuid } = require('uuid');

const middlewares = {
    post: async (req, res) => {
        const token = req.headers.authorization;
        const {refreshToken} = req.body;
        const {userId} = jwt.decode(token, configs.authConfigs.jwtKey, {algorithms: ['HS256']});
        const {jwtKey, tokenOptions} = configs.authConfigs;
        const user = await User.findById(userId)

        if(!user || refreshToken !== user.auth.refreshToken) {
            return res.status(403).json({error: {name: 'RefreshTokenIncorrect', message: 'refresh token is incorrect', responseCode: 0}})
        }

        const newToken = jwt.sign({userId: user._id}, jwtKey, tokenOptions);
        const newRefreshToken = uuid();

        try {
            await User.findByIdAndUpdate(user._id, {'auth.refreshToken': newRefreshToken})
        } catch (error) {
            res.status(500).json('Server error')
        }

        res.status(200).json({newToken, newRefreshToken, responseCode: 1})

    }
}

module.exports = middlewares;