var express = require('express');
var passport = require('passport');
require('./passport')(passport);

var motorcycle = require('../controllers/motorcycleController');
var router = express.Router();

router.post('/add', passport.authenticate('jwt', { session: true }), motorcycle.ADD);

router.put('/update', passport.authenticate('jwt', { session: true }), motorcycle.UPDATE);

router.delete('/delete/:motorcycleId', passport.authenticate('jwt', { session: true }), motorcycle.DELETE);

module.exports = router;