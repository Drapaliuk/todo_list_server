const { authConfigs } = require("../configs/authorization");
const fs = require('fs');
const jwt = require('jsonwebtoken');

// const token = jwt.sign({userId: '2313'}, authConfigs.jwtKey, {expiresIn: 10000})
 

const deleteBearer = token => token.split(' ')[1];

exports.isAuthorization = (req, res, next) => {
    res.send('Hl')
    console.log('hellow')
    // const token = req.headers.authorization;
    // if(!token) return res.status(401);
    
    // const isExpired = jwt.verify(deleteBearer(token), authConfigs.jwtKey, {algorithms: ['HS256']})
    // console.log(isExpired)
    // if(isExpired) return res.status(401)
}


// const authTokenModifier = { //! authTokenModifier
//     deleteBearer: token => token.split(' ')[1],
//     addBearer: token => `Bearer ${token}`,
// }