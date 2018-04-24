var express = require('express');
var loginController = require('../controllers/loginController');
var router = express.Router();

router.get('/', loginController.LOGIN_USER);

module.exports = router;
