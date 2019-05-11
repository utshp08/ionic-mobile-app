const user            = require('../model/UserModel');
const jwtStrategy     = require('passport-jwt').Strategy;
const extractJwt      = require('passport-jwt').ExtractJwt;
const config          = require('../config/config');

const opts = {
    jwtFromReq : extractJwt.fromAuthHeaderAsBearerToken(),
    secretKey : config.jwtSercret
}

module.exports = new jwtStrategy(opts, (payload, done) => {
    user.findById(payload.provider.id, (err, user) => {
        if(err) return done (err, false)
        if(user) {
            return done(null, user)
        } else {
            return done(null, false);
        }
    })
})