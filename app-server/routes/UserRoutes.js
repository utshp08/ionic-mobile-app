const express = require('express');
const Router = express.Router();
const UserCtrl = require('../controllers/UserController');

Router.route('/:id', UserCtrl.find)

exports = Router;