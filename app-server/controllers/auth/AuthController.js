require('../../model/UserModel');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const async = require('async');
const crypto = require('crypto');
const smtpTransport = require('nodemailer');


const SECRET_KEY = "secretkey123";

exports.login = (req, res) => {
        User.findOne({email: req.body.email}, (err, user) => {
            if(err) res.status(500).send(err);
            if(!user)
            {
                res.send({"user": user, "message": 'No user found.'});
            }
            else 
            {
                status = false;
                bcrypt.compare(req.body.password, user.password)
                .then(result => {
                    if(result)
                    {
                        const  expiresIn  =  24  *  60  *  60;
                        const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, {
                                expiresIn:  expiresIn
                        });
                        res.status(200).send({"user" : user, "access_token" : accessToken, "expires_in" : expiresIn,  "status": result});
                    }
                    else
                    {
                        res.status(200).send({"user" : user,"status": result, "message": 'Invalid password'});
                    }
                })
            }
        })
};
exports.login_index = (req, res) => {
  res.send('Login Index');
}

exports.register = (req, res) => {
        status = false;
        User.findOne({email: req.body.email}, (err, user) => {
            if(user)
            {
                res.send({"user": user, "status": status, "message": 'Email already registered'});
            }
            else 
            {
                newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password)
                })
                .save()
                .then(user => {
                    status = true;
                    if(user)
                    {
                        res.status(200).send({"user": user, "status": status});
                    }
                    else 
                    {
                        res.send("Registration failed");
                    }
                })
                .catch(err => res.status(404).send(err));
            }
        });
}

exports.render_reset_password = (req, res) => {

}

exports.forgot_password = function(req, res) {
    async.waterfall([
      function(done) {
        User.findOne({
          email: req.body.email
        }).exec(function(err, user) {
          if (user) {
            done(err, user);
          } else {
            done('User not found.');
          }
        });
      },
      function(user, done) {
        // create the random token
        crypto.randomBytes(20, function(err, buffer) {
          var token = buffer.toString('hex');
          done(err, user, token);
        });
      },
      function(user, token, done) {
        User.findByIdAndUpdate({ _id: user._id }, { reset_password_token: token, reset_password_expires: Date.now() + 86400000 }, { upsert: true, new: true }).exec(function(err, new_user) {
          done(err, token, new_user);
        });
      },
      function(token, user, done) {
        var data = {
          to: user.email,
          from: 'utspantonia@gmail.com',
          template: 'forgot-password-email',
          subject: 'Password help has arrived!',
          context: {
            url: 'http://localhost:5000/forgot_password?token=' + token,
            name: 'Reymart'
          }
        };
  
        smtpTransport.sendMail(data, function(err) {
          if (!err) {
            return res.json({ message: 'Kindly check your email for further instructions' });
          } else {
            return done(err);
          }
        });
      }
    ], function(err) {
      return res.status(422).json({ message: err });
    });
  };



