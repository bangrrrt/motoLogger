var ObjectId = require('mongodb').ObjectID;
var Log = require('../models/logModel');
var GetToken = require('./helper').getToken;

// Adds a new log
exports.CREATE_LOG = function(req, res) {
  const token = GetToken(req.headers);

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
    return res.status(403).send('Unauthorized.');
  }
};

exports.GET_LOGS = function(req, res) {
  var token = GetToken(req.headers);
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
    return res.status(403).send('Unauthorized.');
  }
};

// Updates a log
exports.UPDATE_LOG = function(req, res) {
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
exports.DELETE_LOG = async (req, res) => {
  try {
    const logId = req.params.logId;
    const log = await Log.deleteOne({ _id: logId });

    if (!log) {
      res.send(`Could not find log ${logId}`);
    } else {
      res.json(logId)
    }
  } catch(err) {
    res.status(500).send(`Unknown error while deleting log ${logId}. ${err}`)
  }
};
