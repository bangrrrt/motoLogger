var express = require('express');
var router = express.Router();
var LoginController = require('../controllers/loginController');
var passport = require('passport');
require('./passport')(passport);

router.post('/', LoginController.login);

router.get('/user', passport.authenticate('jwt', { session: true }), LoginController.getUser);

module.exports = router;
