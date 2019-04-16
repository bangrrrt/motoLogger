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
exports.UPDATE_LOG = async (req, res) => {
  try {
    const newLog = { ...req.body };
    const { logId } = req.body;

    const updatedLog = await Log.findOneAndUpdate({ _id: logId }, newLog);
      if (!updatedLog) {
        res.status(404).send(`Could not find log ${logId}`);
      } else {
        res.status(200).send(updatedLog);
      }
  } catch (err) {
    res.status(500).send(`Unknown error while updating log. ${err}`)
  }
};

// Deletes a log
exports.DELETE_LOG = async (req, res) => {
  try {
    const { logId } = req.params;
    const log = await Log.deleteOne({ _id: logId });

    if (!log) {
      res.status(404).send(`Could not find log ${logId}`);
    } else {
      res.status(200).json(logId)
    }
  } catch(err) {
    res.status(500).send(`Unknown error while deleting log ${logId}. ${err}`)
  }
};
