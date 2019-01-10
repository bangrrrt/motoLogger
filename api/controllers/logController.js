var mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');
var dbResources = require('./resources');
var Log = require('../models/logModel');
var { dbURL, logCollection, dataBase } = dbResources;
var getToken = require('../helper');

// Adds a new log
exports.CREATE_LOG = function(req, res) {
  const token = getToken(req.headers);

  if (token) {
    const logId = ObjectId();
    const newLog = new Log({
      ...req.body,
      _id: logId,
      logId: logId,
      isEditable: false
    });

    newLog.save(function(err, log) {
      if(err) {
        return res.json(err);
      } else {
        return res.json(log);
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
};

exports.GET_LOGS = function(req, res) {
  var token = getToken(req.headers);
  var motorcycleId = req.params.motorcycleId;

  if (token) {
    Log.find({ motorcycleId: motorcycleId }, function (err, logs) {
      if (err) {
        return json(err);
      }

      if (!logs.length) {
        return res.json({ 
          motorcycleId,          
          logs: []
        });
      }

      return res.json({
        motorcycleId,
        logs
      });
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
};

// Updates a log
exports.UPDATE_LOG = function(req, res) {
  var resultArray = [];
  var newLog = { ...req.body };

  Log.findById({ _id: req.body.logId }, function(err, log) {
    if (err) {
      res.send(err);
    }

    log.set(newLog);

    log.save(function(err, updatedLog) {
      if (err) {
        res.send(err);
      }

      res.send(updatedLog);
    })
  });
};

// Deletes a log
exports.DELETE_LOG = function(req, res) {
  Log.deleteOne({ _id: req.params.logId }, function(err, log) {
    if (err) {
      res.send(err);
    }

    res.json(log.logId)
  });
};
