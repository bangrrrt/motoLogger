var express = require('express');
var passport = require('passport');
require('./passport')(passport);

var logs = require('../controllers/logController');
var router = express.Router();

router.get('/list/:motorcycleId', passport.authenticate('jwt', { session: true }), logs.GET_LOGS);

router.put('/updateLog', passport.authenticate('jwt', { session: true }), logs.UPDATE_LOG);
// One of these, or even both, should probably use the post method instead
router.put('/createLog', passport.authenticate('jwt', { session: true }), logs.CREATE_LOG);

router.delete('/deleteLog/:logId', passport.authenticate('jwt', { session: true }), logs.DELETE_LOG);

module.exports = router;