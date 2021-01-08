const jwt = require('jsonwebtoken');
const { User } = require('../../db/models/user/user');
const bcrypt = require('bcrypt');
const configs = require('../../configs/authorization');
const { v4: uuid } = require('uuid');
const ResponseError = require('../../errors_handlers/response_error');

const middlewares = {
    post: async (req, res, next) => { 
        const {login, password} = req.body;
        const {tokenOptions, jwtKey} = configs.authConfigs;

        if(!login || !password) {
            return next(new ResponseError('LACK PASSWORD OR LOGIN', 400, 'your not passed password or login'))
        }

        const user = await User.findOne({'auth.login': login});
      
        if(!user) {
            return next(new ResponseError('LOGIN NOT REGISTERED', 404, 'user is not found by passed login'))
        }

        const isCorrectPassword = await bcrypt.compare(password, user.auth.password)
    
        if(!isCorrectPassword) {
            return next(new ResponseError('INVALID PASSWORD', 401, 'passed password is invalid'))
        }

        const refreshToken = uuid();
        const token = jwt.sign({userId: user._id}, jwtKey, tokenOptions);
        const {auth, __v, ...updatedUser} = (await User.findByIdAndUpdate(user._id, {'auth.refreshToken': refreshToken}))._doc

        if(!updatedUser) {
            return next(new Error())
        }

        res.status(200).json({userId: user._id, token, refreshToken, user: updatedUser})
    }
}


module.exports = middlewares;