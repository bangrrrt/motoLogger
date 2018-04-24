var express = require('express');
var registerController = require('../controllers/registerController');
var router = express.Router();

router.post('/', registerController.REGISTER_USER);

module.exports = router;