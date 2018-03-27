var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
// var url = 'mongodb://localhost:27017/motoMaintenance';

var db = 'heroku_r020v8q8';
var collection = 'logs';

// Adds a new log
exports.CREATE_LOG = function(req, res) {
  mongo.connect(process.env.MONGODB_URI, function(err, client) {
    var newLog = {
      _id: req.body.logId,
      logId: req.body.logId,
      itemName: req.body.itemName,
      dateAdded: req.body.dateAdded,
      notes: req.body.notes,
      isEditable: req.body.isEditable,
      parts: req.body.parts,
      miles: req.body.miles
    };

    if (err) {
      res.send(err);
    }

    client.db(db).collection(collection)
      .insertOne(newLog, function(err, results) {
        assert.equal(null, err);

        res.json(newLog);
        client.close();
      });
  });
};

// Gets all the saved logs
exports.GET_LOGS = function(req, res) {
  mongo.connect(process.env.MONGODB_URI, function(err, client) {
    if (err) {
      res.send(err);
    }

    var db = client.db(db);
    var collection = db.collection(collection);

    collection.find({}).toArray(function (err, result) {
      if (err) {
        res.send(err);
      };
      res.json({ logs: result });
      client.close();
    });
    client.close();
  });
};

// Updates a log
exports.UPDATE_LOG = function(req, res) {
  var resultArray = [];
  mongo.connect(process.env.MONGODB_URI, function(err, client) {
    var updatedLog = {
      _id: req.body.logId,
      logId: req.body.logId,
      itemName: req.body.itemName,
      dateAdded: req.body.dateAdded,
      notes: req.body.notes,
      isEditable: false,
      parts: req.body.parts,
      miles: req.body.miles
    };

    if (err) {
      res.send(err);
    }

    client.db(db).collection(collection)
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
  mongo.connect(process.env.MONGODB_URI, function(err, client) {
    assert.equal(null, err);

    client.db(db).collection(collection)
      .deleteOne({ _id: req.params.logId }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);

        res.send('Log deleted.')
        client.close();
    });
  })
};