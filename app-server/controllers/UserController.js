require('../model/user');
require('../model/profile');

const mongoose = require(mongoose);
const User = mongoose.model('User');
const Profile = mongoose.model('Profile');

exports.user_profile = (req, res) => {
    
}

exports.find(user) = (req, res) => {
    User.findOne({_id: user.id}, (err, user) => {
        if(err) throw err
        if(user)
        {
            return user;
        }
        
    })
}