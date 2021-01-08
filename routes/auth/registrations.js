const jwt = require('jsonwebtoken');
const { User } = require('../../db/models/user/user');
const bcrypt = require('bcrypt');
const configs = require('../../configs/authorization');
const { v4: uuid } = require('uuid');
const ResponseError = require('../../errors_handlers/response_error');

const middlewares = {
    post: async (req, res, next) => { 
        const {login, password} = req.body;
        if(!login || !password) {
            return next(new ResponseError('LACK PASSWORD OR LOGIN', 400, 'your not passed password or login'))
        }

        const saltedPassword = bcrypt.hashSync(password, 10);
        const {tokenOptions, jwtKey} = configs.authConfigs;

        const existLogin = await User.findOne({'auth.login': login})
        if(existLogin) {
            return next(new ResponseError('LOGIN ALREADY USE', 406, 'this login has already use'))
        }

        const refreshToken = uuid();
        const {auth, __v, ...user} = (await User.create({auth: {login, password: saltedPassword, refreshToken}}))._doc
        const token = jwt.sign({userId: user._id}, jwtKey, tokenOptions);

        res.status(201).json({token, refreshToken, user})
    }
}

module.exports = middlewares;