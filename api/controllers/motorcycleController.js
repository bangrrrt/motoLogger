var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var dbResources = require('./resources');
var User = require('../models/user');
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

// Adds a new motorcycle
exports.ADD = function(req, res) {
  var token = getToken(req.headers);

  if (token) {
    const _id = objectId();
    const newMotorcycle = {
      ...req.body,
      motorcycleId: _id,
      _id
    };

    User.findByIdAndUpdate(req.user._id, { $set: { motorcycles: newMotorcycle  }}, { new: true }, function (err, user) {
      if (err) return res.json(err);

      res.json(user.motorcycles);
    });
  } else {
    return res.status(403).send('Unauthorized.');
  }
};

// Updates a motorcycle
exports.UPDATE = function(req, res) {
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

// Deletes a motorcycle
exports.DELETE = function(req, res) {
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