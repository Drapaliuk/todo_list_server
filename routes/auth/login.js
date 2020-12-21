const jwt = require('jsonwebtoken');
const { User } = require('../../db/models/user/user');
const bcrypt = require('bcrypt');
const configs = require('../../configs/authorization');
const { v4: uuid } = require('uuid');

const middlewares = {
    post: async (req, res) => { 
        const {login, password} = req.body;
        const {tokenOptions, jwtKey} = configs.authConfigs;

        if(!login || !password) {
            return res.status(400).json({message: 'There are not password or login'})
        }

        const user = await User.findOne({'auth.login': login});
      
        if(!user) {
            return res.status(403).json({message: 'Wrong login or password'})
        }

        const isCorrectPassword = await bcrypt.compare(password, user.auth.password)
    
        if(!isCorrectPassword) {
            return res.status(403).json({message: 'Wrong login or password'})
        }

        const refreshToken = uuid();
        const token = jwt.sign({userId: user._id}, jwtKey, tokenOptions);
        const saveRefreshToken = await User.findByIdAndUpdate(user._id, {'auth.refreshToken': refreshToken})
        
        if(!saveRefreshToken) {
            res.status(500).json('Server error')
        }

        res.status(200).json({userId: user._id, token, refreshToken})
    }
}


module.exports = middlewares;