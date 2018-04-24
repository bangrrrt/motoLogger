var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var dbResources = require('./resources/resources');

var { dbURL, usersCollection, dataBase } = dbResources;

// Logs user in
exports.LOGIN_USER = function(req, res) {
  mongo.connect(dbURL, function(err, client) {
    if (err) {
      res.send(err);
    }
    // client.db(dataBase).collection(usersCollection)

    res.json({ 'success': 'Logged in!' });
    client.close();
  });
};
