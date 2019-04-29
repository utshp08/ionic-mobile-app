const express = require('express');
const Router = express.Router();
const UserLocationCtl = require('../controllers/UserLocationCtrl');

Router.post('/new', UserLocationCtl.newLocation);

module.exports = Router;