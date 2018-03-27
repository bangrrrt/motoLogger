var express = require('express');
var logs = require('../controllers/logController');
var router = express.Router();

router.get('/list', logs.GET_LOGS);

router.put('/updateLog', logs.UPDATE_LOG);

router.put('/createLog', logs.CREATE_LOG);

router.delete('/deleteLog/:logId', logs.DELETE_LOG);

module.exports = router;