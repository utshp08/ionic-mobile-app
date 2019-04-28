const User              = require('../model/user');
const jwt               = require('jsonwebtoken');
const config            = require('../config/config');

function createToken(user) 
{
    return jwt.sign({id: user.provider.id, email: user.email}, config.jwtSercret, {
        expiresIn: 200
    });
}

exports.registerUser = (req, res) => {
    
}