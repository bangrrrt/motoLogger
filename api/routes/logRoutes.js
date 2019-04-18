const express = require('express');
const passport = require('passport');
require('./passport')(passport);

const logs = require('../controllers/logController');
const router = express.Router();

router.get('/list/:motorcycleId', passport.authenticate('jwt', { session: true }), logs.getLogs);

router.put('/updateLog', passport.authenticate('jwt', { session: true }), logs.updateLog);
// One of these, or even both, should probably use the post method instead
router.put('/createLog', passport.authenticate('jwt', { session: true }), logs.createLog);

router.delete('/deleteLog/:logId', passport.authenticate('jwt', { session: true }), logs.deleteLog);

module.exports = router;
