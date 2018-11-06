var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var dbResources = require('./resources');
var LogModel = require('../models/logModel');
var MotorcycleModel = require('../models/motorcycleModel');
var { dbURL, logCollection, dataBase } = dbResources;

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

// Adds a new log
exports.CREATE_LOG = function(req, res) {
  mongo.connect(dbURL, function(err, client) {
    var newLog = {
      _id: req.body.logId,
      logId: req.body.logId,
      logName: req.body.logName,
      dateAdded: req.body.dateAdded,
      notes: req.body.notes,
      isEditable: req.body.isEditable,
      parts: req.body.parts,
      miles: req.body.miles
    };

    if (err) {
      res.send(err);
    }

    client.db(dataBase).collection(logCollection)
      .insertOne(newLog, function(err, results) {
        assert.equal(null, err);

        res.send("Log added!");
        client.close();
      });
  });
};

// Gets all the saved logs
// exports.GET_LOGS = function(req, res) {
//   mongo.connect(dbURL, function(err, client) {
//     if (err) {
//       res.send(err);
//     }

//     client.db(dataBase).collection(logCollection)
//       .find({}).sort({ miles: -1 }).toArray(function (err, result) {
//         if (err) {
//           res.send(err);
//         };
//         res.json({ logs: result });
//         client.close();
//       });
//     client.close();
//   });
// };

exports.GET_LOGS = function(req, res) {
  console.log('body', req.body)
  var token = getToken(req.headers);
  console.log('token', token);
  if (token) {
    LogModel.find({ motorcycleId: req.body.motorcycleId }, function (err, logs) {
      if (err) return next(err);

      console.log('motorcycles', logs)

      if (logs.length) {
        res.json({
          logs
        });
      } else {
        res.json({ logs: null });
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
};

// Updates a log
exports.UPDATE_LOG = function(req, res) {
  var resultArray = [];
  mongo.connect(dbURL, function(err, client) {
    var updatedLog = {
      _id: req.body.logId,
      logId: req.body.logId,
      logName: req.body.logName,
      dateAdded: req.body.dateAdded,
      notes: req.body.notes,
      isEditable: false,
      parts: req.body.parts,
      miles: req.body.miles
    };

    if (err) {
      res.send(err);
    }

    client.db(dataBase).collection(logCollection)
      .updateOne({ _id: req.body.logId }, { $set: updatedLog }, function(err, result) {
        if (err) {
          res.send(err)
        }

        res.send(updatedLog)
        client.close();
    });
  });
};

// Deletes a log
exports.DELETE_LOG = function(req, res) {
  mongo.connect(dbURL, function(err, client) {
    assert.equal(null, err);

    client.db(dataBase).collection(logCollection)
      .deleteOne({ _id: req.params.logId }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.ok);

        res.send('Log deleted.')
        client.close();
    });
  })
};