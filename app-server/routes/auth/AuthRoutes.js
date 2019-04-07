const express = require('express');
const Router = express.Router();
const AuthController = require('../../controllers/auth/AuthController');

Router.route('/login')
.post(AuthController.login);

Router.route('/register')
.post(AuthController.register);

Router.route('/forgot_password')
.post(AuthController.forgot_password);

module.exports = Router;
