const { User } = require("../../db/models/user/user");
const { v4: uuid } = require('uuid');
const jwt = require('jsonwebtoken');
const configs = require('../../configs/authorization');





const isValidToken = token => {
    return jwt.verify(token, configs.authConfigs.jwtKey, {algorithms: ['HS256']});
}

const middlewares = {
    post: async (req, res) => {
        const token = req.headers.authorization;
        const {refreshToken} = req.body;
        const {jwtKey, tokenOptions} = configs.authConfigs;

        let userId;

        try {
            const verifiedToken = jwt.verify(token, jwtKey, {algorithms: ['HS256']});
            userId = verifiedToken.userId;
        } catch (error) { // різну логіку на різні типи помилок і перевірка наявності
            const decodedToken = jwt.decode(token, jwtKey);
            userId = decodedToken.userId;
        }


        const user = await User.findById(userId);
        if(!user.auth.refreshToken === refreshToken) {
            return res.status(403).json({responseCode: 0, message: 'Invalid token and refresh token'})
        } 
      
        console.log('USER', user)

        const newToken = jwt.sign({userId: userId}, jwtKey, tokenOptions);
        const newRefreshToken = uuid();
        const payload = {
            tasks: user.tasksLists,
            biography: user.biography,
            settings: user.settings
        }
        try {
            await User.findByIdAndUpdate(userId, {'auth.refreshToken': newRefreshToken})
        } catch (error) {
            res.status(500).json('Server error')
        }

        res.status(200).json({newToken, newRefreshToken, payload, responseCode: 1})
    }
}

module.exports = middlewares;