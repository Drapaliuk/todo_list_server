const jwt = require('jsonwebtoken');
const { User } = require('../../db/models/user/user');
const configs = require('../../configs/authorization');


const middlewares = {
    delete: async (req, res) => { 
        const token = req.headers.authorization;
        const {jwtKey} = configs.authConfigs;
        const {userId} = jwt.decode(token, jwtKey);  // what should i do if token is invalid? Find by refresh token or do nothing, only delete tokens on the frontend) 
        
        const user = await User.findById(userId);
        user.auth.refreshToken = '';
        user.save();
        
        res.status(200).json({message: 'user has been logout'});
    }
}

module.exports = middlewares;