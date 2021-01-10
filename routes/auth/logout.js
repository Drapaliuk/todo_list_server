const jwt = require('jsonwebtoken');
const configs = require('../../configs/authorization');
const DBSelectors = require('../../utils/DBSelectors');


const middlewares = {
    delete: async (req, res) => { 
        const token = req.headers.authorization;
        const {jwtKey} = configs.authConfigs;
        const {userId} = jwt.decode(token, jwtKey); 
        
        const user = await DBSelectors.getUserById(userId);
        user.auth.refreshToken = '';
        user.save();
        
        res.status(200);
    }
}

module.exports = middlewares;