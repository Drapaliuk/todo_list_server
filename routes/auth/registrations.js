const jwt = require('jsonwebtoken');
const { User } = require('../../db/models/user/user');
const bcrypt = require('bcrypt');
const configs = require('../../configs/authorization');
const { v4: uuid } = require('uuid');

const middlewares = {
    post: async (req, res) => { 
        const {login, password} = req.body;
        if(!login || !password) {
            return res.status(400).json({message: 'There are not password or login', responseCode: 0})
        }
        const saltedPassword = bcrypt.hashSync(password, 10);
        const {tokenOptions, jwtKey} = configs.authConfigs;


        const existLogin = await User.findOne({'auth.login': login})
        if(existLogin) {
            return res.status(406).json({message: 'This login has already use', responseCode: 2})
        }

        const refreshToken = uuid();
        const {_id: userId} = await User.create({auth: {login, password: saltedPassword, refreshToken}})
        const token = jwt.sign({userId}, jwtKey, tokenOptions);

        res.status(201).json({token, refreshToken, responseCode: 1})
    }
}

module.exports = middlewares;