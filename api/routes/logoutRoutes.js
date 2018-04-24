var express = require('express');
var logoutController = require('../controllers/logoutController');
var router = express.Router();

router.put('/', logoutController.LOGOUT_USER);

module.exports = router;
