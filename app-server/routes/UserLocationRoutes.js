const express = require('express');
const Router = express.Router();
const UserLocationCtl = require('../controllers/UserLocationCtrl');

Router.route('/location/new').post(UserLocationCtl.new_location);

module.exports = Router;