var ObjectId = require('mongodb').ObjectID;
var Log = require('../models/logModel');
var GetToken = require('./helper').getToken;

// Adds a new log
exports.CREATE_LOG = async (req, res) => {
  const token = GetToken(req.headers);

  if (token) {
    const logId = ObjectId();
    const newLog = new Log({
      ...req.body,
      _id: logId,
      logId,
      isEditable: false
    });

    try {
      const log = await newLog.save(newLog);
      res.json(log);
    } catch(err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        res.status(409).send(`Duplicate entry. ${err}`);
      }

      res.status(500).send(err);
    }

  } else {
    return res.status(403).send('Please login to create a new log.');
  }
};

exports.GET_LOGS = async (req, res) => {
  const token = GetToken(req.headers);
  const motorcycleId = req.params.motorcycleId;

  if (token) {
    try {
      const logs = await Log.find({ motorcycleId });

      if(!logs) {
        res.status(404).send(`Logs not found for motorcycle ${motorcycleId}`)
      } else if (!logs.length) {
        res.status(200).json({ 
          motorcycleId,          
          logs: []
        });
      } else {
        res.status(200).json({
          motorcycleId,
          logs
        });
      }
    } catch(err) {
      res.send(500).send(`Unknown error while getting logs. ${err}`)
    }
  } else {
    return res.status(403).send('Please login to view your logs.');
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
      res.status(204).json(logId)
    }
  } catch(err) {
    res.status(500).send(`Unknown error while deleting log ${logId}. ${err}`)
  }
};
