var express = require('express');
var router = express.Router();
var registerController = require('../controllers/registerController');


router.post('/', registerController.addUser);

module.exports = router;